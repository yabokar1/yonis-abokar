import { anonymize, containsVaultValue, type VaultEntry } from "./anonymize"

export type Step = {
  name: string
  detail: string
  state: "done" | "blocked"
}

export type Report = {
  impression: string
  flags: string[]
  actions: string[]
}

export type WorkflowResult = {
  steps: Step[]
  anonymized: string
  vault: VaultEntry[]
  report: Report | null
  blocked: boolean
}

function analyze(anonymized: string): Report {
  const flags: string[] = []
  const actions: string[] = []
  if (/spO2\s*94%|94%\s*on room air/i.test(anonymized)) {
    flags.push("Oxygen saturation in the note is 94%.")
  }
  if (/asthma/i.test(anonymized)) flags.push("Asthma is listed in the history.")
  if (/cough/i.test(anonymized)) flags.push("A cough is the presenting symptom.")
  if (/salbutamol/i.test(anonymized)) {
    actions.push("Salbutamol is already written in the note. Confirm the device at follow-up.")
  }
  if (/follow up/i.test(anonymized)) {
    actions.push("A follow-up interval is already in the note. Do not invent a new one.")
  }
  if (actions.length === 0) actions.push("No medication or follow-up instruction was detected.")
  return {
    impression: flags.length
      ? "Respiratory note. The flags below come only from the anonymized text."
      : "No acute pattern was detected in the anonymized text.",
    flags,
    actions,
  }
}

export function runWorkflow(note: string, skipAnonymizer: boolean): WorkflowResult {
  const steps: Step[] = [
    {
      name: "Intake",
      detail: "The chart note stays in the browser. Nothing is uploaded.",
      state: "done",
    },
  ]

  if (skipAnonymizer) {
    steps.push({
      name: "SafeGPT",
      detail: "Anonymizer was turned off for this test.",
      state: "blocked",
    })
    steps.push({
      name: "Agent",
      detail: "Refused. The agent only accepts text that has been through SafeGPT.",
      state: "blocked",
    })
    return { steps, anonymized: note, vault: [], report: null, blocked: true }
  }

  const { text, vault } = anonymize(note)
  steps.push({
    name: "SafeGPT",
    detail: `Replaced ${vault.length} identifiers with tokens. The vault stays on this device.`,
    state: "done",
  })

  if (containsVaultValue(text, vault)) {
    steps.push({
      name: "Outbound check",
      detail: "Refused. A raw identifier was still in the payload.",
      state: "blocked",
    })
    return { steps, anonymized: text, vault, report: null, blocked: true }
  }

  steps.push({
    name: "Outbound check",
    detail: "The payload has tokens only. Identifier values are absent.",
    state: "done",
  })

  const report = analyze(text)
  steps.push({
    name: "Agent",
    detail: "The analyst read the anonymized note and returned a structured result.",
    state: "done",
  })
  steps.push({
    name: "Client",
    detail: "The result is shown here. Names are mapped back only in the local vault, not inside the agent.",
    state: "done",
  })

  return { steps, anonymized: text, vault, report, blocked: false }
}
