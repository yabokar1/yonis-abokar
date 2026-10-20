import { Link, useParams } from "react-router-dom";
import { findStudy } from "../content";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = findStudy(slug);

  if (!study) {
    return (
      <section className="missing">
        <h1>That project is not on this site.</h1>
        <Link className="text-link" to="/">
          Back to selected work
        </Link>
      </section>
    );
  }

  return (
    <article className="study">
      <p className="study-back">
        <Link to={{ pathname: "/", hash: "work" }}>All work</Link>
      </p>
      <header className="study-header">
        <p className="eyebrow">
          {study.index} · {study.kicker}
        </p>
        <h1>{study.title}</h1>
        <p className="lede">{study.summary}</p>
      </header>

      <dl className="study-meta">
        <div>
          <dt>Role</dt>
          <dd>{study.role}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{study.period}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{study.status}</dd>
        </div>
      </dl>

      <ul className="stack" aria-label="Stack">
        {study.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {study.links.length > 0 && (
        <p className="study-links">
          {study.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </p>
      )}

      <section>
        <h2>The problem</h2>
        <p>{study.problem}</p>
      </section>

      <section>
        <h2>What shipped</h2>
        <ul className="plain-list">
          {study.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="callout">
        <h2>{study.hardPart.title}</h2>
        <p>{study.hardPart.body}</p>
      </section>

      <section>
        <h2>How it is put together</h2>
        <div className="system">
          {study.system.map((column) => (
            <div key={column.label} className="system-col">
              <h3>{column.label}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>What it demonstrates</h2>
        <ul className="plain-list">
          {study.shows.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>What I can walk through</h2>
        <ol className="talk">
          {study.talkAbout.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
