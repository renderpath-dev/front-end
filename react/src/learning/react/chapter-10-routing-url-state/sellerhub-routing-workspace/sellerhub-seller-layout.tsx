import { NavLink, Outlet } from 'react-router'

function sellerLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'sellerhub-subnav-link sellerhub-subnav-link-active' : 'sellerhub-subnav-link'
}

export function SellerHubSellerLayout() {
  return (
    <section className="sellerhub-seller-layout">
      <aside>
        <p>Protected UI placeholder</p>
        <nav aria-label="Seller dashboard">
          <NavLink className={sellerLinkClassName} end to="/seller">
            Dashboard
          </NavLink>
          <NavLink className={sellerLinkClassName} to="/seller/orders">
            Orders
          </NavLink>
        </nav>
      </aside>
      <div className="sellerhub-seller-content">
        <Outlet />
      </div>
    </section>
  )
}

export function SellerHubDashboardHome() {
  return (
    <div>
      <p>Nested index route</p>
      <h3>Seller dashboard</h3>
      <p>The seller layout remains mounted while its Outlet changes.</p>
    </div>
  )
}
