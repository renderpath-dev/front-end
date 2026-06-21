import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { SellerHubCatalogPage } from './sellerhub-catalog-page'
import { SellerHubCheckoutPage } from './sellerhub-checkout-page'
import { SellerHubLoginPage } from './sellerhub-login-page'
import { SellerHubNotFoundPage } from './sellerhub-not-found-page'
import { SellerHubOrdersPage } from './sellerhub-orders-page'
import { SellerHubProductDetailPage } from './sellerhub-product-detail-page'
import { SellerHubProtectedRoute } from './sellerhub-protected-route'
import { SellerHubDashboardHome, SellerHubSellerLayout } from './sellerhub-seller-layout'
import { SellerHubWorkspaceLayout } from './sellerhub-workspace-layout'

export function SellerHubRoutingWorkspace() {
  const [isSellerAuthenticated, setIsSellerAuthenticated] = useState(false)

  return (
    <Routes>
      <Route
        element={
          <SellerHubWorkspaceLayout isSellerAuthenticated={isSellerAuthenticated} />
        }
      >
        <Route element={<Navigate replace to="/catalog" />} index />
        <Route element={<SellerHubCatalogPage />} path="catalog" />
        <Route element={<SellerHubProductDetailPage />} path="catalog/:productId" />
        <Route
          element={
            <SellerHubProtectedRoute isSellerAuthenticated={isSellerAuthenticated} />
          }
        >
          <Route element={<SellerHubSellerLayout />} path="seller">
            <Route element={<SellerHubDashboardHome />} index />
            <Route element={<SellerHubOrdersPage />} path="orders" />
          </Route>
        </Route>
        <Route element={<SellerHubCheckoutPage />} path="checkout" />
        <Route
          element={<SellerHubLoginPage onLogin={() => setIsSellerAuthenticated(true)} />}
          path="login"
        />
        <Route element={<SellerHubNotFoundPage />} path="not-found" />
        <Route element={<SellerHubNotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}
