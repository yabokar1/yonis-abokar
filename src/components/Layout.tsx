import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

const titleFor = (pathname: string) => {
  if (pathname.startsWith("/agent")) return "SafeGPT Health Agent — Yonis Abokar"
  if (pathname.startsWith("/graphql")) return "Field Desk GraphQL — Yonis Abokar"
  if (pathname.startsWith("/mesh")) return "Northline — Yonis Abokar"
  if (pathname.startsWith("/pipeline")) return "Copperline ETL — Yonis Abokar"
  if (pathname.startsWith("/work/proactive-drivers")) return "Proactive Drivers — Yonis Abokar"
  if (pathname.startsWith("/work/learnedwmp")) return "LearnedWMP — Yonis Abokar"
  if (pathname.startsWith("/experience")) return "Experience — Yonis Abokar"
  if (pathname === "/") return "Yonis Abokar — Software Engineer"
  return "Page not found — Yonis Abokar"
}

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    document.title = titleFor(location.pathname)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/">
            Yonis Abokar
          </Link>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" end>
              Work
            </NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <a className="pill" href="mailto:yabokar@gmail.com">
              Email
            </a>
          </nav>
        </div>
      </header>
      <main id="content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <p>Yonis Abokar · Toronto</p>
          <p className="footer-links">
            <a href="mailto:yabokar@gmail.com">yabokar@gmail.com</a>
            <a href="https://www.linkedin.com/in/yonisabokar/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/yabokar1" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="tel:+16475695136">647-569-5136</a>
          </p>
        </div>
      </footer>
    </>
  )
}
