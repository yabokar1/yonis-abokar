export type RawRow = {
  site: string
  ts: string
  hz: string
  db: string
}

export type Rejected = RawRow & { reason: string }

export type Loaded = {
  site: string
  hour: string
  samples: number
  avgDb: number
  maxHz: number
}

export const sampleCsv = `site,ts,hz,db
S1,2026-10-20T14:02:00Z,180,42
S1,2026-10-20T14:17:00Z,240,48
S1,2026-10-20T14:41:00Z,,51
S1,2026-10-20T15:05:00Z,300,46
S2,2026-10-20T14:10:00Z,220,-4
S2,2026-10-20T14:55:00Z,260,55
S2,not-a-time,400,60
S3,2026-10-20T15:12:00Z,510,71
S3,2026-10-20T15:44:00Z,180,130
S3,2026-10-20T16:01:00Z,190,63`

export function parseCsv(csv: string): RawRow[] {
  const [header, ...lines] = csv.trim().split(/\r?\n/)
  const columns = header.split(",")
  if (columns.join(",") !== "site,ts,hz,db") {
    throw new Error("Header must be site,ts,hz,db.")
  }
  return lines.filter(Boolean).map((line) => {
    const [site = "", ts = "", hz = "", db = ""] = line.split(",")
    return { site, ts, hz, db }
  })
}

export function runPipeline(csv: string) {
  const extracted = parseCsv(csv)
  const rejected: Rejected[] = []
  const clean: { site: string; hour: string; hz: number; db: number }[] = []

  for (const row of extracted) {
    const when = Date.parse(row.ts)
    const hz = Number(row.hz)
    const db = Number(row.db)
    if (!row.site) {
      rejected.push({ ...row, reason: "Missing site." })
    } else if (Number.isNaN(when)) {
      rejected.push({ ...row, reason: "Timestamp does not parse." })
    } else if (!row.hz || Number.isNaN(hz) || hz <= 0) {
      rejected.push({ ...row, reason: "Frequency is missing or not positive." })
    } else if (Number.isNaN(db) || db < 0 || db > 120) {
      rejected.push({ ...row, reason: "Decibel reading is outside 0–120." })
    } else {
      const hour = new Date(when).toISOString().slice(0, 13) + ":00Z"
      clean.push({ site: row.site, hour, hz, db })
    }
  }

  const groups = new Map<string, { site: string; hour: string; samples: number; dbSum: number; maxHz: number }>()
  for (const row of clean) {
    const key = `${row.site}|${row.hour}`
    const group = groups.get(key) ?? { site: row.site, hour: row.hour, samples: 0, dbSum: 0, maxHz: 0 }
    group.samples += 1
    group.dbSum += row.db
    group.maxHz = Math.max(group.maxHz, row.hz)
    groups.set(key, group)
  }

  const loaded: Loaded[] = [...groups.values()]
    .map((group) => ({
      site: group.site,
      hour: group.hour,
      samples: group.samples,
      avgDb: Math.round((group.dbSum / group.samples) * 10) / 10,
      maxHz: group.maxHz,
    }))
    .sort((a, b) => a.hour.localeCompare(b.hour) || a.site.localeCompare(b.site))

  return { extracted: extracted.length, rejected, loaded }
}
