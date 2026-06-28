import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router'

type SellerRouteWorkspaceProps = {
  isAuthenticated?: boolean
}

export function SellerRouteWorkspace({ isAuthenticated = false }: SellerRouteWorkspaceProps) {
  return (
    <Routes>
      <Route element={<CatalogRoute />} path="/catalog" />
      <Route element={<SellerOrderRoute />} path="/seller/orders/:orderId" />
      <Route
        element={<ProtectedOrdersRoute isAuthenticated={isAuthenticated} />}
        path="/seller/orders"
      />
      <Route element={<LoginRoute />} path="/login" />
    </Routes>
  )
}

function CatalogRoute() {
  return (
    <section>
      <h2>Catalog route</h2>
      <Link to="/seller/orders">Open seller orders</Link>
    </section>
  )
}

function SellerOrderRoute() {
  const params = useParams()

  return <h2>Order detail {params.orderId}</h2>
}

function ProtectedOrdersRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />
  }

  return <h2>Seller orders route</h2>
}

function LoginRoute() {
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'

  return (
    <section>
      <h2>Login route</h2>
      <p>Redirect target: {from}</p>
    </section>
  )
}
