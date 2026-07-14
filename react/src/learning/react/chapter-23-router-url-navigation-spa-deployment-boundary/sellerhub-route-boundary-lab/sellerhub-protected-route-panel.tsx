import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

export function SellerHubProtectedRoutePanel({
  children,
  isAuthenticated,
}: {
  children: ReactNode
  isAuthenticated: boolean
}) {
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{ returnTo: location.pathname }}
        to="/sellerhub/login"
      />
    )
  }

  return <>{children}</>
}
