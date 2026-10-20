import { useState } from "react"
import { Link } from "react-router-dom"
import { runPipeline, sampleCsv } from "../lib/pipeline"

export default function PipelinePage() {
  const [csv, setCsv] = useState(sampleCsv)
  const [error, setError] = useState("")
  const [result, setResult] = useState(() => runPipeline(sampleCsv))

  const run = (next = csv) => {
    try {
      setResult(runPipeline(next))
      setError("")
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The file could not be read.")
    }
  }

  return (
    <div className="page">
      <p className="back">
        <Link to="/">All projects</Link>
      </p>
      <header className="demo-head">
        <p className="kicker">ETL · Copperline</p>
        <h1>Bad rows stop. Good rows become hourly facts.</h1>
        <p className="lede">
          Same shape as a Spark job: extract, validate, aggregate, load. This one runs in the
          browser on a sample sensor feed. A missing frequency, a broken timestamp, or a decibel
          reading outside 0–120 is rejected with a reason.
        </p>
      </header>
      <div className="workspace">
        <div className="stat-row">
          <div>
            <strong>{result.extracted}</strong>
            <span>Extracted</span>
          </div>
          <div>
            <strong>{result.rejected.length}</strong>
            <span>Rejected</span>
          </div>
          <div>
            <strong>{result.loaded.length}</strong>
            <span>Loaded hours</span>
          </div>
        </div>
        <div className="row-actions">
          <button type="button" className="pill dark" onClick={() => run()}>
            Run pipeline
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setCsv(sampleCsv)
              setResult(runPipeline(sampleCsv))
              setError("")
            }}
          >
            Reset sample
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="split">
          <label className="field">
            <span>Source CSV</span>
            <textarea value={csv} onChange={(event) => setCsv(event.target.value)} rows={14} />
          </label>
          <div>
            <h2>Rejected</h2>
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {result.rejected.map((row, index) => (
                  <tr key={`${row.site}-${row.ts}-${index}`}>
                    <td>{row.site || "—"}</td>
                    <td>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <h2>Loaded</h2>
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Hour</th>
              <th>Samples</th>
              <th>Avg dB</th>
              <th>Max Hz</th>
            </tr>
          </thead>
          <tbody>
            {result.loaded.map((row) => (
              <tr key={`${row.site}-${row.hour}`}>
                <td>{row.site}</td>
                <td>{row.hour}</td>
                <td>{row.samples}</td>
                <td>{row.avgDb}</td>
                <td>{row.maxHz}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
