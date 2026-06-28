import { Link, Route, Routes, useLocation } from 'react-router'
import { SellerHubCatalogFilter } from './sellerhub-catalog-filter'
import { SellerHubLoginForm } from './sellerhub-login-form'
import { SellerHubOrdersPanel } from './sellerhub-orders-panel'
import { SellerHubProtectedRoute } from './sellerhub-protected-route'
import { useSellerAuth } from './sellerhub-auth-context'

export function SellerHubTestedWorkflowRoutes() {
  return (
    <Routes>
      <Route element={<CatalogPage />} path="/catalog" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SellerHubProtectedRoute />}>
        <Route element={<SellerHubOrdersPanel />} path="/seller/orders" />
      </Route>
    </Routes>
  )
}

function CatalogPage() {
  return (
    <section className="workflow-card">
      <h3>Catalog workspace</h3>
      <SellerHubCatalogFilter onApply={() => {}} />
      <Link to="/seller/orders">Open seller orders</Link>
    </section>
  )
}

function LoginPage() {
  const auth = useSellerAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'

  return (
    <section className="workflow-card">
      <h3>Login required</h3>
      <p>Redirect target: {from}</p>
      <SellerHubLoginForm onSubmit={(values) => auth.signIn(values.email)} />
    </section>
  )
}
