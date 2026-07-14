import { evaluateFeatureFlagRelease } from '../15-rollback-feature-flag/feature-flag-model'
import { sellerHubFeatureFlag } from './sellerhub-release-evidence-data'

const decision = evaluateFeatureFlagRelease(sellerHubFeatureFlag)

export function RollbackDecisionPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="rollback-decision-title">
      <h3 id="rollback-decision-title">Rollback decision panel</h3>
      <p role="status">Ready for release: {decision.readyForRelease ? 'yes' : 'no'}</p>
      <p>Disable path: {sellerHubFeatureFlag.disablePath}</p>
    </section>
  )
}
