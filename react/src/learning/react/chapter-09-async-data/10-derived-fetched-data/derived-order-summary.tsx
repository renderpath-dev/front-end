import { useState } from 'react'

type OrderStatus = 'pending' | 'shipped'

type Order = {
  id: string
  status: OrderStatus
  total: number
}

const fetchedOrders: Order[] = [
  { id: 'ORD-1001', status: 'pending', total: 129 },
  { id: 'ORD-1002', status: 'shipped', total: 84 },
  { id: 'ORD-1003', status: 'pending', total: 215 },
]

export function DerivedOrderSummary() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all')
  const visibleOrders = orders.filter(
    (order) => statusFilter === 'all' || order.status === statusFilter,
  )
  const visibleTotal = visibleOrders.reduce((total, order) => total + order.total, 0)

  return (
    <article className="practice-card">
      <p className="practice-label">Derived fetched data</p>
      <h3>Keep filtered results out of state</h3>
      <button type="button" onClick={() => setOrders(fetchedOrders)}>Load fetched orders</button>
      <label>
        Status filter
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.currentTarget.value as 'all' | OrderStatus)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
        </select>
      </label>
      <p>{visibleOrders.length} visible orders · ${visibleTotal.toFixed(2)}</p>
    </article>
  )
}
