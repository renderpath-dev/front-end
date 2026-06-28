import { useState } from 'react'
import type { SellerOrder } from './sellerhub-testing-types'

type OrdersState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: SellerOrder[] }
  | { status: 'error'; message: string }

export function SellerHubOrdersPanel() {
  const [ordersState, setOrdersState] = useState<OrdersState>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrdersState({ status: 'pending' })

    try {
      const response = await fetch('/api/seller/orders')

      if (!response.ok) {
        throw new Error(`Orders request failed with status ${response.status}`)
      }

      const payload = (await response.json()) as SellerOrder[]
      setOrdersState({ status: 'success', orders: payload })
    } catch {
      setOrdersState({ status: 'error', message: 'Unable to load seller orders.' })
    }
  }

  return (
    <section className="workflow-card" aria-labelledby="workflow-orders-title">
      <h3 id="workflow-orders-title">Seller orders</h3>
      <button onClick={handleLoadOrders} type="button">
        Load seller orders
      </button>

      {ordersState.status === 'idle' ? <p>No orders loaded.</p> : null}
      {ordersState.status === 'pending' ? <p role="status">Loading seller orders...</p> : null}
      {ordersState.status === 'error' ? <p role="alert">{ordersState.message}</p> : null}
      {ordersState.status === 'success' && ordersState.orders.length === 0 ? (
        <p>No seller orders found.</p>
      ) : null}
      {ordersState.status === 'success' && ordersState.orders.length > 0 ? (
        <ul aria-label="Seller order results">
          {ordersState.orders.map((order) => (
            <li key={order.id}>
              {order.customer} {order.status} ${order.total}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
