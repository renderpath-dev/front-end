import { useState } from 'react'
import { MemoryRouter, Navigate, Route, Routes } from 'react-router'
import { SellerHubNotFoundPanel } from './sellerhub-not-found-panel'
import { SellerHubProtectedRoutePanel } from './sellerhub-protected-route-panel'
import { SellerHubRouteShell } from './sellerhub-route-shell'
import {
  SellerHubCatalogDetailPage,
  SellerHubCatalogPage,
  SellerHubDashboardPage,
  SellerHubHelpPage,
  SellerHubLoginPage,
  SellerHubOrderDetailPage,
  SellerHubOrdersPage,
  SellerHubSettingsPage,
} from './sellerhub-route-pages'

export function SellerHubMemoryRouterLab({
  initialEntries = ['/sellerhub/catalog?channel=online'],
}: {
  initialEntries?: string[]
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          element={
            <SellerHubRouteShell
              isAuthenticated={isAuthenticated}
              onAuthenticationChange={setIsAuthenticated}
            />
          }
          path="/sellerhub"
        >
          <Route element={<Navigate replace to="catalog" />} index />
          <Route element={<SellerHubCatalogPage />} path="catalog" />
          <Route element={<SellerHubCatalogDetailPage />} path="catalog/:productId" />
          <Route element={<SellerHubOrdersPage />} path="orders" />
          <Route element={<SellerHubOrderDetailPage />} path="orders/:orderId" />
          <Route element={<SellerHubDashboardPage />} path="dashboard" />
          <Route
            element={
              <SellerHubProtectedRoutePanel isAuthenticated={isAuthenticated}>
                <SellerHubSettingsPage />
              </SellerHubProtectedRoutePanel>
            }
            path="settings"
          />
          <Route element={<SellerHubHelpPage />} path="help" />
          <Route element={<SellerHubNotFoundPanel />} path="*" />
        </Route>
        <Route
          element={<SellerHubLoginPage onAuthenticate={() => setIsAuthenticated(true)} />}
          path="/sellerhub/login"
        />
        <Route element={<SellerHubNotFoundPanel />} path="*" />
      </Routes>
    </MemoryRouter>
  )
}
