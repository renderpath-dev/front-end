import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersList() {
  const { state } = useSellerOrdersContext()

  if (state.status === 'pending' && state.orders.length === 0) {
    return <p className="orders-feedback">Loading seller orders...</p>
  }

  if (state.status === 'empty') {
    return <p className="orders-feedback">No orders match the current criteria.</p>
  }

  if (state.status === 'error' && state.orders.length === 0) {
    return <p className="orders-feedback status-error">{state.message}</p>
  }

  return (
    <div>
      {state.status === 'pending' && (
        <p className="orders-feedback">Refreshing while previous orders remain visible...</p>
      )}
      {state.status === 'error' && (
        <p className="orders-feedback status-error">{state.message}</p>
      )}
      <div className="orders-list">
        {state.orders.map((order) => (
          <article className="order-row" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <span>{order.customerName}</span>
            </div>
            <span className={`order-status order-status-${order.status}`}>{order.status}</span>
            <strong>${order.total.toFixed(2)}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}
