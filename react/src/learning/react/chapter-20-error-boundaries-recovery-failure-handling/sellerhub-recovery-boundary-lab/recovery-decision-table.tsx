import { recoveryDecisions } from './sellerhub-recovery-boundary-data'

export function RecoveryDecisionTable() {
  return (
    <section className="recovery-card recovery-card-wide" aria-labelledby="decision-table-title">
      <h3 id="decision-table-title">Recovery decision table</h3>
      <div className="recovery-table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Boundary</th>
              <th scope="col">Failure</th>
              <th scope="col">Recovery</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody>
            {recoveryDecisions.map((decision) => (
              <tr key={decision.boundary}>
                <td>{decision.boundary}</td>
                <td>{decision.failure}</td>
                <td>{decision.recovery}</td>
                <td>{decision.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
