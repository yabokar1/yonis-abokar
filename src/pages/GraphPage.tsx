import { useState } from "react"
import { Link } from "react-router-dom"
import {
  assignQuery,
  clashQuery,
  resetFieldDesk,
  runFieldDesk,
  sampleQuery,
  type LoadMode,
} from "../lib/graphqlDemo"

export default function GraphPage() {
  const [source, setSource] = useState(sampleQuery)
  const [mode, setMode] = useState<LoadMode>("each")
  const [output, setOutput] = useState<{ data: unknown; errors: string[]; trace: string[] } | null>(null)

  const execute = async (nextSource = source, nextMode = mode) => {
    setOutput(await runFieldDesk(nextSource, nextMode))
  }

  return (
    <div className="page">
      <p className="back">
        <Link to="/">All projects</Link>
      </p>
      <header className="demo-head">
        <p className="kicker">GraphQL · Field Desk</p>
        <h1>A dispatch API with a booking conflict.</h1>
        <p className="lede">
          The schema runs in the browser with GraphQL.js. Assigning a technician into a window they
          already have is rejected. Switch the loader to see one query per technician, or one batch
          for the request.
        </p>
      </header>
      <div className="workspace">
        <div className="row-actions">
          <button type="button" className="pill dark" onClick={() => execute()}>
            Run
          </button>
          <button
            type="button"
            className="pill dark ghost"
            onClick={() => {
              setSource(sampleQuery)
              execute(sampleQuery)
            }}
          >
            Board query
          </button>
          <button
            type="button"
            className="pill dark ghost"
            onClick={() => {
              setSource(assignQuery)
              execute(assignQuery)
            }}
          >
            Assign Jonah
          </button>
          <button
            type="button"
            className="pill dark ghost"
            onClick={() => {
              setSource(clashQuery)
              execute(clashQuery)
            }}
          >
            Double-book Lina
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              resetFieldDesk()
              setOutput(null)
            }}
          >
            Reset data
          </button>
          <label className="check">
            <input
              type="radio"
              name="mode"
              checked={mode === "each"}
              onChange={() => setMode("each")}
            />
            Load each technician
          </label>
          <label className="check">
            <input
              type="radio"
              name="mode"
              checked={mode === "batched"}
              onChange={() => setMode("batched")}
            />
            Batch the load
          </label>
        </div>
        <div className="split">
          <label className="field">
            <span>Operation</span>
            <textarea value={source} onChange={(event) => setSource(event.target.value)} rows={16} />
          </label>
          <div className="field">
            <span>Response</span>
            <pre>{output ? JSON.stringify({ data: output.data, errors: output.errors }, null, 2) : "Run an operation."}</pre>
          </div>
        </div>
        <h2>Resolver trace</h2>
        {output && output.trace.length > 0 ? (
          <ol className="trace">
            {output.trace.map((line, index) => (
              <li key={`${line}-${index}`}>{line}</li>
            ))}
          </ol>
        ) : (
          <p>No resolvers ran yet.</p>
        )}
      </div>
    </div>
  )
}
