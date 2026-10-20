import { Link } from "react-router-dom";
import { caseStudies } from "../content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Toronto · Open to full-time roles</p>
        <h1>
          I build software
          <em> people book, query, and ship.</em>
        </h1>
        <p className="lede">
          Full-stack developer with a production booking platform for a client and a published
          database demo at SIGMOD. I am on contract building industrial software, and I am looking for
          a full-time product engineering role.
        </p>
        <dl className="facts">
          <div>
            <dt>Degree</dt>
            <dd>Software Engineering, York University</dd>
          </div>
          <div>
            <dt>Certificate</dt>
            <dd>AWS Cloud Practitioner, 2024</dd>
          </div>
          <div>
            <dt>Publication</dt>
            <dd>SIGMOD Companion 2025, co-author</dd>
          </div>
        </dl>
      </section>

      <section id="work" className="work">
        <div className="section-label">
          <h2>Selected work</h2>
          <p>Three projects I can walk through from the problem to the code.</p>
        </div>
        <ol className="work-list">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <Link className="work-row" to={`/work/${study.slug}`}>
                <span className="work-index">{study.index}</span>
                <span className="work-copy">
                  <span className="work-kicker">{study.kicker}</span>
                  <span className="work-title">{study.title}</span>
                  <span className="work-summary">{study.summary}</span>
                </span>
                <span className="work-meta">
                  <span>{study.period}</span>
                  <span className="work-go" aria-hidden="true">
                    Read
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="now">
        <h2>Right now</h2>
        <p>
          On contract at Mueller, building C# tools for acoustic leak detection while the driving-school
          platform stays in production. I am looking for a full-time software developer role in Toronto
          or remote Canada: React, TypeScript, Node, and PostgreSQL, or a backend role in Python.
        </p>
        <Link className="text-link" to="/experience">
          See the full timeline
        </Link>
      </section>
    </>
  );
}
