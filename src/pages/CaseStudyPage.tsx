import { Link, useParams } from "react-router-dom"
import { learnedPaper, proactiveSite } from "../content"

export default function CaseStudyPage() {
  const { slug } = useParams()

  if (slug === "proactive-drivers") {
    return (
      <div className="page narrow">
        <p className="back">
          <Link to="/">All projects</Link>
        </p>
        <p className="kicker">Freelance · production</p>
        <h1>Proactive Drivers</h1>
        <p className="lede">
          Booking, student accounts, and an admin desk for an Ontario driving school. React,
          TypeScript, Node, PostgreSQL, and a React Native app. The source repository is private.
        </p>
        <p>
          <a className="pill" href={proactiveSite} target="_blank" rel="noreferrer">
            Open proactivedriversinc.com
          </a>
        </p>
        <div className="prose">
          <h2>What shipped</h2>
          <ul>
            <li>Public site, student dashboard, and admin schedule.</li>
            <li>Lesson booking that claims a slot only if it is still open.</li>
            <li>Invite-only accounts, with student, instructor, and admin roles.</li>
            <li>Web on AWS Amplify. Postgres is not exposed as a public API.</li>
          </ul>
          <h2>The bug worth talking about</h2>
          <p>
            Two students can both see a free hour. The write runs in a transaction. A conditional
            update marks the slot booked only when it is still free, and a second lesson in the
            same instructor window is rejected.
          </p>
        </div>
      </div>
    )
  }

  if (slug === "learnedwmp") {
    return (
      <div className="page narrow">
        <p className="back">
          <Link to="/">All projects</Link>
        </p>
        <p className="kicker">SIGMOD Companion 2025</p>
        <h1>LearnedWMP</h1>
        <p className="lede">
          Co-authored demo on estimating working memory for a database workload, instead of scoring
          one query at a time. With Shaikh Quader, Ghadeer Abuoda, Marin Litoiu, and Manos Papagelis.
        </p>
        <p>
          <a className="pill" href={learnedPaper} target="_blank" rel="noreferrer">
            Open the paper
          </a>
        </p>
        <div className="prose">
          <ul>
            <li>Feature pipelines from IBM Db2 TPC-C workloads.</li>
            <li>A dashboard comparing accuracy, inference time, and model size.</li>
            <li>91% prediction accuracy on unseen workloads.</li>
            <li>83% faster batch processing from a multi-threaded runner.</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <h1>That project is not on this site.</h1>
      <Link to="/">Back to projects</Link>
    </div>
  )
}
