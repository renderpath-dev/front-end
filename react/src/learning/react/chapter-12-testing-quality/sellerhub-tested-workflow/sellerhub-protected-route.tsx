import { Navigate, Outlet, useLocation } from 'react-router'
import { useSellerAuth } from './sellerhub-auth-context'

export function SellerHubProtectedRoute() {
  const auth = useSellerAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />
  }

  return <Outlet />
}
