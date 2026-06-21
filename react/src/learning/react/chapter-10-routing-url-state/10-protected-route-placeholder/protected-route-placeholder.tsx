import { useState } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router'

type RedirectLocationState = {
  from?: string
}

function readRedirectPath(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof (state as RedirectLocationState).from === 'string'
  ) {
    return (state as RedirectLocationState).from ?? '/practice/protected'
  }

  return '/practice/protected'
}

function ProtectedPracticeRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname + location.search }}
        to="/practice/login"
      />
    )
  }

  return <Outlet />
}

function ProtectedPracticeContent() {
  return <p className="routing-success-text">The UI guard allowed this route element.</p>
}

function PracticeLoginPlaceholder() {
  const location = useLocation()
  const redirectPath = readRedirectPath(location.state)

  return (
    <div className="routing-result-box">
      <p>This is a local UI login placeholder.</p>
      <p>
        Intended destination: <code>{redirectPath}</code>
      </p>
    </div>
  )
}

export function ProtectedRoutePlaceholder() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">10 / UI access boundary</p>
      <h2>A protected route placeholder is not backend authorization</h2>
      <label className="routing-toggle-row">
        <input
          checked={isAuthenticated}
          onChange={(event) => setIsAuthenticated(event.currentTarget.checked)}
          type="checkbox"
        />
        <span>Local auth placeholder</span>
      </label>
      <div className="routing-practice-actions">
        <Link to="/practice/protected">Open protected practice route</Link>
        <Link to="/practice/login">Open login placeholder</Link>
      </div>
      <Routes>
        <Route element={<ProtectedPracticeRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<ProtectedPracticeContent />} path="/practice/protected" />
        </Route>
        <Route element={<PracticeLoginPlaceholder />} path="/practice/login" />
      </Routes>
    </article>
  )
}
