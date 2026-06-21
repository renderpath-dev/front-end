import { Link, useLocation } from 'react-router'

export function SellerHubNotFoundPage() {
  const location = useLocation()

  return (
    <section className="sellerhub-not-found">
      <p>Fallback route</p>
      <h3>Page not found</h3>
      <p>
        No route branch handles <code>{location.pathname}</code>.
      </p>
      <Link to="/catalog">Return to catalog</Link>
    </section>
  )
}
