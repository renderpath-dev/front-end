import { sellerHubOrders } from './sellerhub-accessibility-data'

export function OrdersTableAccessibility() {
  return (
    <section className="a11y-card" aria-labelledby="orders-table-title">
      <h3 id="orders-table-title">Orders table accessibility panel</h3>
      <p>
        Tabular order data keeps native table semantics. The sortable column exposes a
        real button inside the header cell.
      </p>
      <div className="a11y-table-scroll">
        <table>
          <caption>SellerHub orders awaiting review</caption>
          <thead>
            <tr>
              <th scope="col">
                <button type="button" aria-label="Sort orders by customer">
                  Customer
                </button>
              </th>
              <th scope="col">Order</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {sellerHubOrders.map((order) => (
              <tr key={order.id}>
                <th scope="row">{order.customer}</th>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
