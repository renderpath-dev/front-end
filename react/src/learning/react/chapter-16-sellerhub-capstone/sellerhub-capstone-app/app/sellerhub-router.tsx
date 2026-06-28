import { Navigate, Route, Routes } from 'react-router'
import { CartPanel } from '../features/cart/cart-public-api'
import { CatalogPage } from '../features/catalog/catalog-public-api'
import { CheckoutForm } from '../features/checkout/checkout-public-api'
import { EvidencePage } from '../features/evidence/evidence-public-api'
import { OperationsPage } from '../features/operations/operations-public-api'
import { SellerOrdersPage } from '../features/orders/orders-public-api'
import { ProductDetailPage } from '../features/product-detail/product-detail-public-api'
import { SellerHubShell } from './sellerhub-shell'

export function SellerHubRouter() {
  return (
    <Routes>
      <Route element={<SellerHubShell />} path="/react/chapter-16">
        <Route index element={<Navigate replace to="catalog" />} />
        <Route element={<CatalogPage />} path="catalog" />
        <Route element={<ProductDetailPage />} path="products/:productId" />
        <Route element={<CartPanel />} path="cart" />
        <Route element={<CheckoutForm />} path="checkout" />
        <Route element={<SellerOrdersPage />} path="seller/orders" />
        <Route element={<OperationsPage />} path="operations" />
        <Route element={<EvidencePage />} path="evidence" />
        <Route element={<Navigate replace to="catalog" />} path="*" />
      </Route>
    </Routes>
  )
}
