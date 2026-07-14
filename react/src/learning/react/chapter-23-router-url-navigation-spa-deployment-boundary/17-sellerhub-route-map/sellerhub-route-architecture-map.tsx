const routeMapRows = [
  ['/sellerhub/catalog', 'Catalog list', 'pathname'],
  ['/sellerhub/catalog/:productId', 'Product detail', 'route param'],
  ['/sellerhub/catalog?channel=online', 'Catalog filter', 'search params'],
  ['/sellerhub/orders/:orderId', 'Order detail', 'route param'],
  ['/sellerhub/settings', 'Settings page', 'protected route boundary'],
  ['/sellerhub/*', 'Recovery page', 'catch-all route'],
]

export function SellerHubRouteArchitectureMap() {
  return (
    <section className="route-lab-card" aria-labelledby="sellerhub-route-map-title">
      <p className="route-card-kicker">Part 17</p>
      <h2 id="sellerhub-route-map-title">SellerHub route architecture mapping</h2>
      <p>
        SellerHub route design separates page identity, entity identity, shareable filter state,
        auth UI boundaries, and deployment assumptions.
      </p>
      <table className="sellerhub-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>UI responsibility</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {routeMapRows.map(([route, responsibility, owner]) => (
            <tr key={route}>
              <td>
                <code className="route-code">{route}</code>
              </td>
              <td>{responsibility}</td>
              <td>{owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
