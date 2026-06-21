import { useSearchParams } from 'react-router'
import { sellerOrderCounts } from './sellerhub-catalog-data'
import type { SellerOrderStatus } from './sellerhub-catalog-data'

const sellerOrderStatuses: SellerOrderStatus[] = ['all', 'pending', 'shipped']

function parseSellerOrderStatus(value: string | null): SellerOrderStatus {
  return sellerOrderStatuses.includes(value as SellerOrderStatus)
    ? (value as SellerOrderStatus)
    : 'all'
}

export function SellerHubOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseSellerOrderStatus(searchParams.get('status'))
  const visibleCount =
    status === 'all' ? sellerOrderCounts.pending + sellerOrderCounts.shipped : sellerOrderCounts[status]

  function selectStatus(nextStatus: SellerOrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Nested route with URL filter</p>
          <h3>Seller orders</h3>
        </div>
        <code>/seller/orders?status={status}</code>
      </div>
      <div className="routing-segmented-control" role="group" aria-label="Seller order status">
        {sellerOrderStatuses.map((option) => (
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
      <p className="sellerhub-order-count">{visibleCount} orders match the current URL state.</p>
    </section>
  )
}
