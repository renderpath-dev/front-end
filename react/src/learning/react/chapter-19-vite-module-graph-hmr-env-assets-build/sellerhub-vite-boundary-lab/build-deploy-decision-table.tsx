import { deploymentDecisionRows } from './sellerhub-vite-boundary-data'

export function BuildDeployDecisionTable() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Build/deploy decision table</h3>
      <p>
        Build output review is local evidence. Static hosting still needs base path,
        fallback, caching, and deployment-specific verification.
      </p>
      <table className="vite-boundary-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Review action</th>
          </tr>
        </thead>
        <tbody>
          {deploymentDecisionRows.map(([scenario, action]) => (
            <tr key={scenario}>
              <td>{scenario}</td>
              <td>{action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
