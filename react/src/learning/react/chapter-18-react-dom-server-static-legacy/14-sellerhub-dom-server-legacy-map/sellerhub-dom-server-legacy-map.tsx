import { domBoundaryDecisions } from '../sellerhub-dom-boundary-lab/sellerhub-dom-boundary-data'

export function SellerHubDomServerLegacyMap() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.14 SellerHub mapping</p>
      <h3>SellerHub DOM, server, and legacy API map</h3>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Preferred boundary</th>
            <th>Avoid</th>
          </tr>
        </thead>
        <tbody>
          {domBoundaryDecisions.map((decision) => (
            <tr key={decision.scenario}>
              <td>{decision.scenario}</td>
              <td>{decision.preferredBoundary}</td>
              <td>{decision.avoid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
