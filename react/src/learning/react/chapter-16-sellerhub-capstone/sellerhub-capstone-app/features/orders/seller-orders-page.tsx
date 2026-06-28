import { useEffect, useState } from 'react'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { StatusTabs } from '../../design-system/status-tabs'
import type {
  OrderStatus,
  OrderViewModel,
} from '../../shared/api/sellerhub-adapters'
import { canUpdateOrderStatus } from '../../shared/flags/feature-flags'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import {
  changeSellerOrderStatus,
  loadSellerOrders,
} from './orders-service'

type OrderFilter = 'all' | OrderStatus

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Packing', value: 'packing' },
  { label: 'Shipped', value: 'shipped' },
] as const

export function SellerOrdersPage() {
  const [orders, setOrders] = useState<OrderViewModel[]>([])
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null)
  const [message, setMessage] = useState('Loading orders...')
  const { flags, locale, reportError, role } = useSellerHubApp()
  const canMutate = canUpdateOrderStatus(role, flags)

  useEffect(() => {
    let ignore = false

    loadSellerOrders()
      .then((nextOrders) => {
        if (!ignore) {
          setOrders(nextOrders)
          setMessage('')
        }
      })
      .catch((error: unknown) => {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)
          reportError('seller-orders', normalizedError)
          setMessage(normalizedError.message)
        }
      })

    return () => {
      ignore = true
    }
  }, [reportError])

  async function updateStatus(orderId: string, status: OrderStatus) {
    const previousOrders = orders
    setPendingOrderId(orderId)
    setMessage('Saving optimistic order status...')
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    )

    try {
      const confirmedOrder = await changeSellerOrderStatus(orderId, status)
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? confirmedOrder : order,
        ),
      )
      setMessage(`Order ${orderId} confirmed as ${status}.`)
    } catch (error) {
      const normalizedError = normalizeSellerHubError(error)
      setOrders(previousOrders)
      reportError('seller-order-mutation', normalizedError)
      setMessage(`Rollback: ${normalizedError.message}`)
    } finally {
      setPendingOrderId(null)
    }
  }

  const visibleOrders =
    filter === 'all' ? orders : orders.filter((order) => order.status === filter)

  return (
    <section aria-labelledby="sellerhub-orders-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Seller workflow</p>
          <h2 id="sellerhub-orders-title">
            {sellerHubMessages[locale].ordersTitle}
          </h2>
        </div>
        <p>Role: {role}</p>
      </div>

      <StatusTabs<OrderFilter>
        controlsId="seller-order-results"
        label="Order status"
        onChange={setFilter}
        options={statusOptions}
        value={filter}
      />

      {message && <p role="status">{message}</p>}

      <div
        aria-labelledby={`seller-order-results-${filter}-tab`}
        className="sellerhub-order-list"
        id="seller-order-results"
        role="tabpanel"
      >
        {visibleOrders.map((order) => (
          <article className="sellerhub-card" key={order.id}>
            <div className="sellerhub-card-heading">
              <h3>{order.id}</h3>
              <span className="sellerhub-status">{order.status}</span>
            </div>
            <p>{order.customerName}</p>
            <strong>{formatCurrency(order.totalInCents, locale)}</strong>
            {canMutate ? (
              <div className="sellerhub-card-actions">
                <PrimitiveButton
                  disabled={pendingOrderId === order.id}
                  onClick={() => void updateStatus(order.id, 'packing')}
                  tone="secondary"
                >
                  Mark packing
                </PrimitiveButton>
                <PrimitiveButton
                  disabled={pendingOrderId === order.id}
                  onClick={() => void updateStatus(order.id, 'shipped')}
                >
                  Mark shipped
                </PrimitiveButton>
              </div>
            ) : (
              <p>Order mutation is unavailable for this role or release.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
