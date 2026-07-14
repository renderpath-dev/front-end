import { sellerHubRouteReviewRows } from './sellerhub-route-boundary-data'

export function SellerHubRouteReviewTable() {
  return (
    <section aria-labelledby="sellerhub-route-review-title" className="route-lab-card">
      <p className="route-card-kicker">Route review</p>
      <h3 id="sellerhub-route-review-title">SellerHub route review table</h3>
      <table className="sellerhub-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Owner</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {sellerHubRouteReviewRows.map((row) => (
            <tr key={row.route}>
              <td>
                <code className="route-code">{row.route}</code>
              </td>
              <td>{row.owner}</td>
              <td>{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
