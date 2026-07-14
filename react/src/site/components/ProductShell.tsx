import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ThemeToggle } from './ThemeToggle'

export function ProductShell() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      target?.scrollIntoView({ block: 'start' })
      return
    }

    window.scrollTo({ left: 0, top: 0 })
  }, [location.hash, location.pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="site-brand" to="/">
            <LabMark />
            <span>React + TypeScript Learning Lab</span>
          </Link>
          <nav aria-label="Primary navigation" className="site-navigation">
            <NavLink to="/tutorial">Tutorial</NavLink>
            <NavLink className={docsLinkClassName} to="/docs">
              Docs
            </NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Built as a runnable React + TypeScript learning workspace.</p>
        <nav aria-label="Footer navigation">
          <Link to="/getting-started">Getting Started</Link>
          <Link to="/tutorial">Tutorial</Link>
          <Link to="/docs">Docs</Link>
        </nav>
      </footer>
    </div>
  )
}

function docsLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'active' : undefined
}

function LabMark() {
  return (
    <svg className="site-brand-mark" viewBox="0 0 42 42" aria-hidden="true">
      <circle cx="21" cy="21" r="3.4" />
      <ellipse cx="21" cy="21" rx="18" ry="7.1" />
      <ellipse cx="21" cy="21" rx="18" ry="7.1" transform="rotate(60 21 21)" />
      <ellipse cx="21" cy="21" rx="18" ry="7.1" transform="rotate(120 21 21)" />
    </svg>
  )
}
