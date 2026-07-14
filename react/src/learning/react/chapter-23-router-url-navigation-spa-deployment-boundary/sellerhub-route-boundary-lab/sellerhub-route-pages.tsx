import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router'
import { parseSellerHubEntityId } from '../06-route-params/route-param-parser'
import { sellerHubOrders, sellerHubProducts } from './sellerhub-route-boundary-data'
import { SellerHubNotFoundPanel } from './sellerhub-not-found-panel'
import { SellerHubParamDetailPanel } from './sellerhub-param-detail-panel'

export function SellerHubCatalogPage() {
  const [searchParams] = useSearchParams()
  const channel = searchParams.get('channel') ?? 'all'
  const visibleProducts =
    channel === 'all'
      ? sellerHubProducts
      : sellerHubProducts.filter((product) => product.channel === channel)

  return (
    <section aria-labelledby="sellerhub-catalog-title">
      <h2 id="sellerhub-catalog-title">Catalog route boundary</h2>
      <p>
        Search param channel: <code className="route-code">{channel}</code>
      </p>
      <div className="route-link-grid" aria-label="Catalog filters">
        <Link to="/sellerhub/catalog">All</Link>
        <Link to="/sellerhub/catalog?channel=online">Online</Link>
        <Link to="/sellerhub/catalog?channel=retail">Retail</Link>
      </div>
      <table className="sellerhub-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Channel</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/sellerhub/catalog/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.channel}</td>
              <td>{product.margin}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export function SellerHubCatalogDetailPage() {
  const { productId } = useParams()
  const parsedParam = parseSellerHubEntityId(productId)

  if (parsedParam.status !== 'valid') {
    return <SellerHubNotFoundPanel />
  }

  const product = sellerHubProducts.find((candidate) => candidate.id === parsedParam.entityId)

  if (product === undefined) {
    return <SellerHubNotFoundPanel />
  }

  return (
    <SellerHubParamDetailPanel
      entityId={product.id}
      entityName={product.name}
      entityType="Product"
    />
  )
}

export function SellerHubOrdersPage() {
  return (
    <section aria-labelledby="sellerhub-orders-title">
      <h2 id="sellerhub-orders-title">Orders route boundary</h2>
      <ul className="route-list">
        {sellerHubOrders.map((order) => (
          <li key={order.id}>
            <Link to={`/sellerhub/orders/${order.id}`}>{order.customer}</Link>{' '}
            <code className="route-code">{order.status}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SellerHubOrderDetailPage() {
  const { orderId } = useParams()
  const parsedParam = parseSellerHubEntityId(orderId)

  if (parsedParam.status !== 'valid') {
    return <SellerHubNotFoundPanel />
  }

  const order = sellerHubOrders.find((candidate) => candidate.id === parsedParam.entityId)

  if (order === undefined) {
    return <SellerHubNotFoundPanel />
  }

  return (
    <SellerHubParamDetailPanel entityId={order.id} entityName={order.customer} entityType="Order" />
  )
}

export function SellerHubDashboardPage() {
  return (
    <section aria-labelledby="sellerhub-dashboard-title">
      <h2 id="sellerhub-dashboard-title">Dashboard route boundary</h2>
      <p>Dashboard tabs stay local in this lab; route identity remains the dashboard page.</p>
    </section>
  )
}

export function SellerHubSettingsPage() {
  return (
    <section aria-labelledby="sellerhub-settings-title">
      <h2 id="sellerhub-settings-title">Settings route boundary</h2>
      <p>Settings is protected by a client UI boundary and still requires server authorization.</p>
    </section>
  )
}

export function SellerHubHelpPage() {
  const location = useLocation()

  return (
    <section aria-labelledby="sellerhub-help-title">
      <h2 id="sellerhub-help-title">Help route boundary</h2>
      <p>
        Current hash target: <code className="route-code">{location.hash || 'none'}</code>
      </p>
    </section>
  )
}

export function SellerHubLoginPage({ onAuthenticate }: { onAuthenticate: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const returnTo = readReturnTo(location.state)

  return (
    <section aria-labelledby="sellerhub-login-title" className="sellerhub-warning">
      <h2 id="sellerhub-login-title">Login route boundary</h2>
      <p>
        Redirect return path: <code className="route-code">{returnTo}</code>
      </p>
      <button
        type="button"
        onClick={() => {
          onAuthenticate()
          navigate(returnTo, { replace: true })
        }}
      >
        Use demo session
      </button>
    </section>
  )
}

function readReturnTo(state: unknown): string {
  if (typeof state !== 'object' || state === null || !('returnTo' in state)) {
    return '/sellerhub/catalog'
  }

  const returnTo = (state as { returnTo?: unknown }).returnTo

  return typeof returnTo === 'string' ? returnTo : '/sellerhub/catalog'
}
