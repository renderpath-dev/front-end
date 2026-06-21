import { Navigate, Outlet, useLocation } from 'react-router'

type SellerHubProtectedRouteProps = {
  isSellerAuthenticated: boolean
}

export function SellerHubProtectedRoute({
  isSellerAuthenticated,
}: SellerHubProtectedRouteProps) {
  const location = useLocation()

  if (!isSellerAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname + location.search }}
        to="/login"
      />
    )
  }

  return <Outlet />
}
