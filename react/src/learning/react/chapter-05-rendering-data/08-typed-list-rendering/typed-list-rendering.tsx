type OrderStatus = 'pending' | 'paid' | 'shipped'

type Order = {
  id: string
  customerName: string
  total: number
  status: OrderStatus
}

type TypedOrderListProps = {
  orders: ReadonlyArray<Order>
}

const typedOrders: Order[] = [
  { id: 'order-7001', customerName: 'Avery', total: 148, status: 'paid' },
  { id: 'order-7002', customerName: 'Jordan', total: 92, status: 'pending' },
  { id: 'order-7003', customerName: 'Morgan', total: 275, status: 'shipped' },
]

function TypedOrderList({ orders }: TypedOrderListProps) {
  return (
    <ul className="rendered-list">
      {orders.map((order) => (
        <li key={order.id}>
          <strong>{order.id}</strong>
          <span>
            {order.customerName} · ${order.total} · {order.status}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function TypedListRendering() {
  return (
    <article className="practice-panel">
      <p className="practice-kicker">08 · TypeScript list model</p>
      <h2>Element types make list props precise</h2>
      <p>
        <code>ReadonlyArray&lt;Order&gt;</code> describes every item and prevents accidental
        mutation through the prop.
      </p>
      <TypedOrderList orders={typedOrders} />
    </article>
  )
}
