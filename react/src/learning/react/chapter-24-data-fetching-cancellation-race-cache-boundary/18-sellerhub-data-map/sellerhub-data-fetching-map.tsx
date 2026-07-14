const scenarioRows = [
  ['Catalog search request', 'query resource key', 'parser and stale guard'],
  ['Orders retry', 'request lifecycle', 'retry button and alert'],
  ['Dashboard refresh', 'cache entry', 'stale-while-revalidate review'],
  ['Optimistic order note', 'mutation boundary', 'confirm or rollback'],
]

export function SellerHubDataFetchingMap() {
  return (
    <section className="data-fetching-card" aria-labelledby="sellerhub-map-title">
      <p className="data-fetching-card__eyebrow">9.18</p>
      <h2 id="sellerhub-map-title">SellerHub data-fetching review map</h2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Boundary</th>
            <th>Review evidence</th>
          </tr>
        </thead>
        <tbody>
          {scenarioRows.map(([scenario, boundary, evidence]) => (
            <tr key={scenario}>
              <td>{scenario}</td>
              <td>{boundary}</td>
              <td>{evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
