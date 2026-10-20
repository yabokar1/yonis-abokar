import { useState } from "react"
import { Link } from "react-router-dom"
import { runWorkflow } from "../lib/agent"
import { sampleNote } from "../lib/anonymize"

export default function AgentPage() {
  const [note, setNote] = useState(sampleNote)
  const [skip, setSkip] = useState(false)
  const [result, setResult] = useState(() => runWorkflow(sampleNote, false))

  const run = (nextSkip = skip, nextNote = note) => {
    setResult(runWorkflow(nextNote, nextSkip))
  }

  return (
    <div className="page">
      <p className="back">
        <Link to="/">All projects</Link>
      </p>
      <header className="demo-head">
        <p className="kicker">SafeGPT · health note agent</p>
        <h1>The agent never sees the name.</h1>
        <p className="lede">
          A chart note comes in from the client. SafeGPT replaces identifiers with tokens. The
          agent reads that anonymized text and sends a result back. The vault that maps tokens to
          real values stays in this browser. The sample is fictional.
        </p>
      </header>

      <div className="workspace">
        <div className="split">
          <label className="field">
            <span>Client chart note</span>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={14} />
          </label>
          <div className="field">
            <span>Outbound payload</span>
            <pre className={result.blocked ? "blocked" : "ok"}>{result.anonymized}</pre>
          </div>
        </div>

        <div className="row-actions">
          <button type="button" className="pill dark" onClick={() => run()}>
            Run workflow
          </button>
          <button
            type="button"
            className="pill dark ghost"
            onClick={() => {
              setSkip(true)
              run(true)
            }}
          >
            Failure test: skip SafeGPT
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setNote(sampleNote)
              setSkip(false)
              setResult(runWorkflow(sampleNote, false))
            }}
          >
            Reset sample
          </button>
          <label className="check">
            <input
              type="checkbox"
              checked={skip}
              onChange={(event) => setSkip(event.target.checked)}
            />
            Skip anonymizer
          </label>
        </div>

        <ol className="steps">
          {result.steps.map((step) => (
            <li key={step.name} className={step.state}>
              <strong>{step.name}</strong>
              <span>{step.detail}</span>
            </li>
          ))}
        </ol>

        <div className="split">
          <div>
            <h2>Agent result</h2>
            {result.report ? (
              <>
                <p>{result.report.impression}</p>
                <ul>
                  {result.report.flags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                  {result.report.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No result. The agent stopped before analysis.</p>
            )}
          </div>
          <div>
            <h2>Vault on this device</h2>
            {result.vault.length === 0 ? (
              <p>Empty, because SafeGPT did not run.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Kind</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.vault.map((entry) => (
                    <tr key={entry.token}>
                      <td>{entry.token}</td>
                      <td>{entry.kind}</td>
                      <td>{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
