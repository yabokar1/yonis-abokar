import { Link } from "react-router-dom"
import { projects } from "../content"
import Thumb from "../components/Thumb"

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <p className="kicker">Toronto · Software Engineer</p>
        <h1>I build products, APIs, and data systems.</h1>
        <p className="lede">
          Full Stack Developer. The driving-school platform is in production. Relay and SafeGPT are
          full-stack apps: a client, an API, and a database. Each card opens the site.
        </p>
        <div className="hero-actions">
          <a className="pill" href="mailto:yabokar@gmail.com">
            Get in touch
          </a>
          <Link className="pill ghost" to="/experience">
            Experience
          </Link>
        </div>
      </section>

      <section className="catalog" aria-labelledby="work-heading">
        <div className="catalog-head">
          <h2 id="work-heading">Projects</h2>
          <p>Click a card to open the site.</p>
        </div>
        <div className="card-grid">
          {projects.map((project) => (
            <a key={project.slug} className="course-card" href={project.href} target="_blank" rel="noreferrer">
              <Thumb kind={project.thumb} />
              <div className="course-body">
                <h3>{project.title}</h3>
                <p className="by">Yonis Abokar</p>
                <p className="course-summary">{project.summary}</p>
                <div className="track" aria-hidden="true">
                  <span />
                </div>
                <div className="course-meta">
                  <span>{project.status}</span>
                  <span className="open">Open</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
