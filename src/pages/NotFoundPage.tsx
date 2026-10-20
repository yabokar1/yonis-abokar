import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="page narrow">
      <h1>That page is not here.</h1>
      <Link className="pill" to="/">
        Back to projects
      </Link>
    </div>
  )
}
