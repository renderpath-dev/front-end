import { NavLink, Outlet, useLocation } from 'react-router'
import { SellerHubLinkNavigationPanel } from './sellerhub-link-navigation-panel'

export function SellerHubRouteShell({
  isAuthenticated,
  onAuthenticationChange,
}: {
  isAuthenticated: boolean
  onAuthenticationChange: (nextValue: boolean) => void
}) {
  const location = useLocation()

  return (
    <div className="sellerhub-shell">
      <header>
        <p className="route-card-kicker">MemoryRouter route shell</p>
        <h2>SellerHub route shell</h2>
        <p>
          Current route: <code className="route-code">{location.pathname}</code>
          {location.search ? <code className="route-code">{location.search}</code> : null}
        </p>
        <nav className="sellerhub-nav" aria-label="SellerHub routes">
          <NavLink to="/sellerhub/catalog">Catalog</NavLink>
          <NavLink to="/sellerhub/orders">Orders</NavLink>
          <NavLink to="/sellerhub/dashboard">Dashboard</NavLink>
          <NavLink to="/sellerhub/settings">Settings</NavLink>
          <NavLink to="/sellerhub/help">Help</NavLink>
        </nav>
        <p className="sellerhub-status">
          Demo auth state: {isAuthenticated ? 'authenticated' : 'anonymous'}
        </p>
        <button type="button" onClick={() => onAuthenticationChange(!isAuthenticated)}>
          Toggle demo auth
        </button>
      </header>
      <SellerHubLinkNavigationPanel />
      <main className="sellerhub-main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
