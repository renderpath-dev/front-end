import { useState } from 'react'
import { fetchSellerOrders } from './seller-orders-api'
import type { SellerOrderRecord } from './seller-orders-api'

type NetworkOrderState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: SellerOrderRecord[] }
  | { status: 'error'; message: string }

export function SellerOrdersNetworkPanel() {
  const [orderState, setOrderState] = useState<NetworkOrderState>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrderState({ status: 'pending' })

    try {
      const orders = await fetchSellerOrders('open')
      setOrderState({ status: 'success', orders })
    } catch {
      setOrderState({ status: 'error', message: 'Network order request failed.' })
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="network-orders-title">
      <p className="skill-pill">MSW</p>
      <h2 id="network-orders-title">Network-backed seller orders</h2>
      <button onClick={handleLoadOrders} type="button">
        Load network orders
      </button>
      {orderState.status === 'idle' ? <p>No request has started.</p> : null}
      {orderState.status === 'pending' ? <p role="status">Loading network orders...</p> : null}
      {orderState.status === 'error' ? <p role="alert">{orderState.message}</p> : null}
      {orderState.status === 'success' ? (
        <ul aria-label="Network orders">
          {orderState.orders.map((order) => (
            <li key={order.id}>
              {order.customer}: ${order.total}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
