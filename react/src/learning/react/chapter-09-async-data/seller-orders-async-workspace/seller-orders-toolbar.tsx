import type { SellerOrderCriteria } from './seller-order-types'
import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersToolbar() {
  const { criteria, retry, setCriteria, state } = useSellerOrdersContext()

  return (
    <div className="orders-toolbar">
      <label>
        Request criteria
        <select
          value={criteria}
          onChange={(event) => setCriteria(event.currentTarget.value as SellerOrderCriteria)}
        >
          <option value="all">All orders</option>
          <option value="pending">Pending orders</option>
          <option value="shipped">Shipped orders</option>
          <option value="cancelled">Empty result</option>
          <option value="request-error">Request error</option>
        </select>
      </label>
      <button type="button" onClick={retry} disabled={state.status === 'pending'}>
        Retry current criteria
      </button>
    </div>
  )
}
