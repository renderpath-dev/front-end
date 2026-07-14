import { evaluateReleaseGate } from '../14-release-gates/release-gate-model'
import { sellerHubReleaseGateChecks } from './sellerhub-release-evidence-data'

const gateResult = evaluateReleaseGate(sellerHubReleaseGateChecks)

export function ReleaseGateChecklist() {
  return (
    <section className="release-evidence-card" aria-labelledby="release-gate-checklist-title">
      <h3 id="release-gate-checklist-title">Release gate checklist</h3>
      <p role="status">Release gate result: {gateResult.status}</p>
      <ul>
        {sellerHubReleaseGateChecks.map((check) => (
          <li key={check.name}>
            {check.name}: {check.status}
          </li>
        ))}
      </ul>
    </section>
  )
}
