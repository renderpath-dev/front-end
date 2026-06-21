import { memo } from 'react'
import type { PerformanceOrder } from './sellerhub-performance-data'

type MemoizedOrderRowProps = {
  onOpen: (orderId: string) => void
  order: PerformanceOrder
}

export const MemoizedOrderRow = memo(function OrderRow({
  onOpen,
  order,
}: MemoizedOrderRowProps) {
  return (
    <li className="sellerhub-performance-row">
      <div>
        <strong>{order.id}</strong>
        <span>{order.customer} / {order.status}</span>
      </div>
      <span>${order.total}</span>
      <button onClick={() => onOpen(order.id)} type="button">
        Open
      </button>
    </li>
  )
})
