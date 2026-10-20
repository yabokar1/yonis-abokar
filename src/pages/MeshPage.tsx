import { useState } from "react"
import { Link } from "react-router-dom"
import { lastChargedKey, placeOrder, replaySameKey, type LogLine } from "../lib/mesh"

const services = ["gateway", "orders", "billing", "warehouse", "notify"] as const

export default function MeshPage() {
  const [failOnce, setFailOnce] = useState(true)
  const [lines, setLines] = useState<LogLine[]>([])

  return (
    <div className="page">
      <p className="back">
        <Link to="/">All projects</Link>
      </p>
      <header className="demo-head">
        <p className="kicker">Services · Northline</p>
        <h1>One order, five services, no double charge.</h1>
        <p className="lede">
          Gateway, orders, billing, warehouse, and notify talk through events. Billing can fail the
          first attempt and still charge once. Replaying the same idempotency key does not charge
          again.
        </p>
      </header>
      <div className="workspace">
        <div className="row-actions">
          <button
            type="button"
            className="pill dark"
            onClick={() => setLines(placeOrder({ failBillingOnce: failOnce }))}
          >
            Run the bus
          </button>
          <button
            type="button"
            className="pill dark ghost"
            onClick={() => {
              const key = lastChargedKey()
              setLines(key ? replaySameKey(key) : replaySameKey(""))
            }}
          >
            Replay the same key
          </button>
          <label className="check">
            <input
              type="checkbox"
              checked={failOnce}
              onChange={(event) => setFailOnce(event.target.checked)}
            />
            Fail the first billing attempt
          </label>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <section key={service}>
              <h2>{service}</h2>
              <ul>
                {lines
                  .filter((line) => line.service === service)
                  .map((line, index) => (
                    <li key={`${service}-${index}`} className={line.tone}>
                      {line.message}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
