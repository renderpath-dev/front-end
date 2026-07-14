import { createRuntimeConfigSnapshot } from './runtime-config-model'
import { sellerHubRuntimeConfig } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const configSnapshot = createRuntimeConfigSnapshot(sellerHubRuntimeConfig)

export function RuntimeConfigEvidencePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="runtime-config-title">
      <p className="release-evidence-card__eyebrow">9.3</p>
      <h2 id="runtime-config-title">Runtime config evidence</h2>
      <p>
        Client config evidence records mode, base URL, build id, app version, and public
        feature flags. It rejects secret-like keys and values before release.
      </p>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Build id</dt>
          <dd>{configSnapshot.buildId}</dd>
        </div>
        <div>
          <dt>Environment</dt>
          <dd>{configSnapshot.environment}</dd>
        </div>
        <div>
          <dt>Secret issues</dt>
          <dd>{configSnapshot.secretIssues.length}</dd>
        </div>
      </dl>
    </section>
  )
}
