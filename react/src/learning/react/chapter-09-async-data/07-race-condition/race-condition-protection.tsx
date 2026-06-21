import { useEffect, useState } from 'react'

type OrderStatus = 'pending' | 'shipped'

type OrdersState =
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }

function loadOrders(status: OrderStatus): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(
      () => resolve(status === 'pending' ? ['ORD-701', 'ORD-702'] : ['ORD-703']),
      status === 'pending' ? 850 : 250,
    )
  })
}

export function RaceConditionProtection() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending')
  const [state, setState] = useState<OrdersState>({ status: 'pending', orders: [] })

  useEffect(() => {
    let ignore = false

    loadOrders(orderStatus).then((orders) => {
      if (!ignore) {
        setState({ status: 'success', orders })
      }
    })

    return () => {
      ignore = true
    }
  }, [orderStatus])

  function handleStatusChange(nextStatus: OrderStatus) {
    setOrderStatus(nextStatus)
    setState((current) => ({ status: 'pending', orders: current.orders }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Race protection</p>
      <h3>Ignore a late result from old criteria</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleStatusChange('pending')}>Pending</button>
        <button type="button" onClick={() => handleStatusChange('shipped')}>Shipped</button>
      </div>
      <p>Criteria: {orderStatus}</p>
      <p>{state.status === 'pending' ? 'Refreshing orders...' : state.orders.join(', ')}</p>
    </article>
  )
}
