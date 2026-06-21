import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersSummary() {
  const { criteria, state } = useSellerOrdersContext()
  const visibleOrderCount = state.orders.length
  const visibleRevenue = state.orders.reduce((total, order) => total + order.total, 0)

  return (
    <aside className="orders-summary" aria-labelledby="orders-summary-title">
      <p className="project-eyebrow">Derived from fetched source data</p>
      <h3 id="orders-summary-title">Current result</h3>
      <dl>
        <div>
          <dt>Criteria</dt>
          <dd>{criteria}</dd>
        </div>
        <div>
          <dt>Lifecycle</dt>
          <dd>{state.status}</dd>
        </div>
        <div>
          <dt>Visible orders</dt>
          <dd>{visibleOrderCount}</dd>
        </div>
        <div>
          <dt>Visible revenue</dt>
          <dd>${visibleRevenue.toFixed(2)}</dd>
        </div>
      </dl>
    </aside>
  )
}
