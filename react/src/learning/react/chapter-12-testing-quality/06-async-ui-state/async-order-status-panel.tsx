import { useState } from 'react'

type OrderSummary = {
  id: string
  label: string
}

type AsyncOrderStatusPanelProps = {
  loadOrders: () => Promise<OrderSummary[]>
}

type OrderStatus =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: OrderSummary[] }
  | { status: 'error'; message: string }

export function AsyncOrderStatusPanel({ loadOrders }: AsyncOrderStatusPanelProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrderStatus({ status: 'pending' })

    try {
      const orders = await loadOrders()
      setOrderStatus({ status: 'success', orders })
    } catch {
      setOrderStatus({ status: 'error', message: 'Orders could not be loaded.' })
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="async-orders-title">
      <p className="skill-pill">Async UI</p>
      <h2 id="async-orders-title">Seller orders</h2>
      <button onClick={handleLoadOrders} type="button">
        Load orders
      </button>

      {orderStatus.status === 'idle' ? <p>Select load orders to start.</p> : null}
      {orderStatus.status === 'pending' ? <p role="status">Loading orders...</p> : null}
      {orderStatus.status === 'error' ? <p role="alert">{orderStatus.message}</p> : null}
      {orderStatus.status === 'success' && orderStatus.orders.length === 0 ? (
        <p>No orders found.</p>
      ) : null}
      {orderStatus.status === 'success' && orderStatus.orders.length > 0 ? (
        <ul aria-label="Loaded orders">
          {orderStatus.orders.map((order) => (
            <li key={order.id}>{order.label}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
