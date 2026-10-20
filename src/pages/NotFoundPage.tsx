import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="missing">
      <h1>That page is not here.</h1>
      <Link className="text-link" to="/">
        Back home
      </Link>
    </section>
  );
}
