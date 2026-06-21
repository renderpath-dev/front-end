import { NavLink, Outlet } from 'react-router'
import { usePerformancePreferences } from './performance-preferences-context'

function performanceLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive
    ? 'sellerhub-performance-link sellerhub-performance-link-active'
    : 'sellerhub-performance-link'
}

export function SellerHubPerformanceLayout() {
  const preferences = usePerformancePreferences()

  return (
    <section className={`sellerhub-performance-workspace density-${preferences.density}`}>
      <header className="sellerhub-performance-header">
        <div>
          <p className="performance-practice-kicker">Final project</p>
          <h2>SellerHub Performance Workspace</h2>
        </div>
        <button onClick={preferences.toggleDensity} type="button">
          Density: {preferences.density}
        </button>
      </header>
      <nav aria-label="Performance workspace" className="sellerhub-performance-nav">
        <NavLink className={performanceLinkClassName} to="/performance/catalog">
          Catalog
        </NavLink>
        <NavLink className={performanceLinkClassName} to="/performance/orders">
          Orders
        </NavLink>
        <NavLink className={performanceLinkClassName} to="/performance/dashboard">
          Dashboard
        </NavLink>
      </nav>
      <div className="sellerhub-performance-stage">
        <Outlet />
      </div>
    </section>
  )
}
