import { evaluateReleaseGate } from './release-gate-model'
import { sellerHubReleaseGateChecks } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const gateResult = evaluateReleaseGate(sellerHubReleaseGateChecks)

export function ReleaseGatePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="release-gate-title">
      <p className="release-evidence-card__eyebrow">9.14</p>
      <h2 id="release-gate-title">Smoke tests and release gates</h2>
      <p>
        Release gates combine command evidence, smoke checks, and manual review. UNKNOWN is
        not PASS and blocks an honest release decision.
      </p>
      <p role="status">Gate status: {gateResult.status}</p>
    </section>
  )
}
