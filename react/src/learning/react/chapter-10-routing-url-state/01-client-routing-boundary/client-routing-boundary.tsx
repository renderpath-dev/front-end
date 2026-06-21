import { Link, useLocation } from 'react-router'

export function ClientRoutingBoundary() {
  const location = useLocation()

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">01 / Navigation boundary</p>
      <h2>Client navigation and document navigation</h2>
      <p>
        The router location is <code>{location.pathname + location.search}</code>.
      </p>
      <div className="routing-practice-actions">
        <Link to="/catalog">Client navigation to catalog</Link>
        <a href="/catalog">Full document request to catalog</a>
      </div>
      <p className="routing-practice-note">
        Both controls have an anchor destination. The Link lets React Router handle the
        same-origin click without requesting a new document.
      </p>
    </article>
  )
}
