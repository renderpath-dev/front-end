import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { MemoizedOrderRow } from './memoized-order-row'
import { performanceOrders } from './sellerhub-performance-data'
import type { PerformanceOrder } from './sellerhub-performance-data'

type OrderStatus = 'all' | PerformanceOrder['status']

function parseStatus(value: string | null): OrderStatus {
  return value === 'pending' || value === 'shipped' ? value : 'all'
}

export default function SellerOrdersPerformancePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null)
  const status = parseStatus(searchParams.get('status'))
  const visibleOrders = performanceOrders.filter(
    (order) => status === 'all' || order.status === status,
  )
  const handleOpenOrder = useCallback((orderId: string) => {
    setOpenedOrderId(orderId)
  }, [])

  function selectStatus(nextStatus: OrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Seller orders render boundary</h3>
        </div>
        <code>{visibleOrders.length} orders</code>
      </div>
      <div className="performance-segmented-control" role="group" aria-label="Order status">
        {(['all', 'pending', 'shipped'] as const).map((option) => (
          <button
            aria-pressed={status === option}
            key={option}
            onClick={() => selectStatus(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <p>Opened order: {openedOrderId ?? 'none'}</p>
      <ul className="sellerhub-performance-list">
        {visibleOrders.slice(0, 14).map((order) => (
          <MemoizedOrderRow key={order.id} onOpen={handleOpenOrder} order={order} />
        ))}
      </ul>
    </section>
  )
}
