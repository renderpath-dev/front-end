import { sellerHubReadinessRows } from './sellerhub-release-evidence-data'

export function ReleaseReadinessReviewTable() {
  return (
    <section className="release-evidence-card" aria-labelledby="readiness-review-table-title">
      <h3 id="readiness-review-table-title">Release readiness review table</h3>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {sellerHubReadinessRows.map((row) => (
            <tr key={row.scenario}>
              <td>{row.scenario}</td>
              <td>{row.owner}</td>
              <td>{row.status}</td>
              <td>{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
