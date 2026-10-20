export type EntityKind = "name" | "date" | "phone" | "email" | "ohip" | "mrn" | "address" | "postal"

export type VaultEntry = {
  token: string
  kind: EntityKind
  value: string
}

const STOP = new Set([
  "New York",
  "North York",
  "Follow Up",
  "Persistent Cough",
  "Blood Pressure",
  "Chest Pain",
])

const PATTERNS: { kind: EntityKind; re: RegExp }[] = [
  { kind: "email", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
  { kind: "phone", re: /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g },
  { kind: "ohip", re: /\b\d{4}[-\s]\d{3}[-\s]\d{3}\b/g },
  { kind: "mrn", re: /\bMRN[-:\s]*[A-Z0-9-]+\b/gi },
  { kind: "postal", re: /\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d\b/gi },
  {
    kind: "date",
    re: /\b(?:\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})\b/gi,
  },
  {
    kind: "address",
    re: /\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Ave|Avenue|St|Street|Rd|Road|Blvd|Drive|Dr|Crescent|Cres)\b\.?/g,
  },
]

export const sampleNote = `Patient: Amira Hassan
DOB: 1984-03-12
OHIP: 1234-567-890
MRN: MRN-44021
Phone: 416-555-0148
Email: amira.hassan.example@email.test
Address: 88 Danforth Ave, Toronto M4K 1N4

Amira Hassan has had a cough for 3 weeks. SpO2 94% on room air. History of asthma. Prescribed salbutamol. Follow up in 7 days with Dr. Patel.`

export function anonymize(input: string): { text: string; vault: VaultEntry[] } {
  const vault: VaultEntry[] = []
  const counts: Partial<Record<EntityKind, number>> = {}

  const tokenFor = (kind: EntityKind, value: string) => {
    const existing = vault.find((entry) => entry.kind === kind && entry.value === value)
    if (existing) return existing.token
    counts[kind] = (counts[kind] ?? 0) + 1
    const token = `[${kind.toUpperCase()}_${counts[kind]}]`
    vault.push({ token, kind, value })
    return token
  }

  let text = input
  for (const pattern of PATTERNS) {
    text = text.replace(pattern.re, (match) => tokenFor(pattern.kind, match.trim()))
  }

  text = text.replace(
    /(?:Patient|Dr\.?|Physician|Attending)\s*[:.]?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
    (full, name: string) => full.replace(name, tokenFor("name", name)),
  )

  text = text.replace(/\b([A-Z][a-z]+\s+[A-Z][a-z]+)\b/g, (name) => {
    if (STOP.has(name) || name.startsWith("[")) return name
    return tokenFor("name", name)
  })

  for (const entry of vault) {
    if (entry.kind === "name" && text.includes(entry.value)) {
      text = text.split(entry.value).join(entry.token)
    }
  }

  return { text, vault }
}

export function containsVaultValue(text: string, vault: VaultEntry[]) {
  return vault.some((entry) => text.includes(entry.value))
}
