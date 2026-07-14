import { domBoundaryDecisions } from './sellerhub-dom-boundary-data'

export function DomBoundaryDecisionTable() {
  return (
    <section className="dom-boundary-card" aria-labelledby="dom-boundary-decision-title">
      <p className="dom-boundary-kicker">Decision table</p>
      <h3 id="dom-boundary-decision-title">DOM boundary decision table</h3>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Preferred boundary</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {domBoundaryDecisions.map((decision) => (
            <tr key={decision.scenario}>
              <td>{decision.scenario}</td>
              <td>{decision.preferredBoundary}</td>
              <td>{decision.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
