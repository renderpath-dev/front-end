import { NavLink, Outlet } from 'react-router'

type SellerHubWorkspaceLayoutProps = {
  isSellerAuthenticated: boolean
}

function workspaceLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'sellerhub-nav-link sellerhub-nav-link-active' : 'sellerhub-nav-link'
}

export function SellerHubWorkspaceLayout({
  isSellerAuthenticated,
}: SellerHubWorkspaceLayoutProps) {
  return (
    <section aria-labelledby="sellerhub-workspace-title" className="sellerhub-workspace">
      <header className="sellerhub-workspace-header">
        <div>
          <p className="routing-practice-kicker">Final project</p>
          <h2 id="sellerhub-workspace-title">SellerHub Routing Workspace</h2>
        </div>
        <span className="sellerhub-auth-status">
          {isSellerAuthenticated ? 'Seller session placeholder: active' : 'Seller session placeholder: off'}
        </span>
      </header>
      <nav aria-label="SellerHub workspace" className="sellerhub-main-nav">
        <NavLink className={workspaceLinkClassName} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/seller">
          Seller
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/checkout">
          Checkout
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/login">
          Login
        </NavLink>
      </nav>
      <div className="sellerhub-route-stage">
        <Outlet />
      </div>
    </section>
  )
}
