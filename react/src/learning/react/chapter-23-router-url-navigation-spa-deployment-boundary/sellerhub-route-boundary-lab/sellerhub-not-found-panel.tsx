import { Link, useLocation } from 'react-router'

export function SellerHubNotFoundPanel() {
  const location = useLocation()

  return (
    <section aria-labelledby="sellerhub-not-found-title" className="sellerhub-warning">
      <h3 id="sellerhub-not-found-title">SellerHub not found route boundary</h3>
      <p>
        No SellerHub route matched <code className="route-code">{location.pathname}</code>.
      </p>
      <Link className="sellerhub-action-link" to="/sellerhub/catalog">
        Recover to catalog
      </Link>
    </section>
  )
}
