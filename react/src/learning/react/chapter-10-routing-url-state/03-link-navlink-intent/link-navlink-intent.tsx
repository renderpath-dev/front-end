import { Link, NavLink } from 'react-router'

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'routing-intent-link routing-intent-link-active' : 'routing-intent-link'
}

export function LinkNavLinkIntent() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">03 / Navigation intent</p>
      <h2>Link moves; NavLink also reports active state</h2>
      <nav aria-label="Navigation intent practice" className="routing-practice-actions">
        <NavLink className={navLinkClassName} end to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={navLinkClassName} to="/seller">
          Seller area
        </NavLink>
        <Link className="routing-intent-link" to="/checkout">
          Checkout
        </Link>
      </nav>
      <p className="routing-practice-note">
        Use NavLink only when the UI needs the current match state. Use Link for ordinary
        navigation intent.
      </p>
    </article>
  )
}
