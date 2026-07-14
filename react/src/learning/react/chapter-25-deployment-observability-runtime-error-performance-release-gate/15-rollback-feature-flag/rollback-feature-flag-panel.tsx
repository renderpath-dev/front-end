import { evaluateFeatureFlagRelease } from './feature-flag-model'
import { sellerHubFeatureFlag } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const featureFlagDecision = evaluateFeatureFlagRelease(sellerHubFeatureFlag)

export function RollbackFeatureFlagPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="rollback-feature-flag-title">
      <p className="release-evidence-card__eyebrow">9.15</p>
      <h2 id="rollback-feature-flag-title">Rollback and feature flag boundary</h2>
      <p>
        A feature flag reduces blast radius only when it has a fallback and a documented
        disable path. It does not replace tests or release gates.
      </p>
      <p role="status">Blast radius: {featureFlagDecision.blastRadius}</p>
    </section>
  )
}
