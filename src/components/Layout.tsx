import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const titleFor = (pathname: string) => {
  if (pathname.startsWith("/work/proactive-drivers")) return "Proactive Drivers — Yonis Abokar";
  if (pathname.startsWith("/work/safegpt")) return "SafeGPT — Yonis Abokar";
  if (pathname.startsWith("/work/learnedwmp")) return "LearnedWMP — Yonis Abokar";
  if (pathname.startsWith("/experience")) return "Experience — Yonis Abokar";
  if (pathname === "/") return "Yonis Abokar — Software Engineer";
  return "Page not found — Yonis Abokar";
};

export default function Layout() {
  const location = useLocation();
  const workActive = location.pathname === "/" || location.pathname.startsWith("/work");

  useEffect(() => {
    document.title = titleFor(location.pathname);
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand" to="/">
            Yonis Abokar
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <Link className={workActive ? "active" : undefined} to={{ pathname: "/", hash: "work" }}>
              Work
            </Link>
            <NavLink to="/experience">Experience</NavLink>
            <a href="mailto:yabokar@gmail.com">Email</a>
          </nav>
        </div>
      </header>
      <main id="content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>Yonis Abokar · Toronto · Software engineer</p>
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
  );
}
