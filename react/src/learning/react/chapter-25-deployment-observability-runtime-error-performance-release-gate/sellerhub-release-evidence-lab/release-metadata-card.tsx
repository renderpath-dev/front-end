import { createRuntimeConfigSnapshot } from '../03-runtime-config/runtime-config-model'
import { sellerHubRuntimeConfig } from './sellerhub-release-evidence-data'

const snapshot = createRuntimeConfigSnapshot(sellerHubRuntimeConfig)

export function ReleaseMetadataCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="release-metadata-title">
      <h3 id="release-metadata-title">Release metadata card</h3>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Build id</dt>
          <dd>{snapshot.buildId}</dd>
        </div>
        <div>
          <dt>App version</dt>
          <dd>{snapshot.appVersion}</dd>
        </div>
        <div>
          <dt>Public config keys</dt>
          <dd>{snapshot.publicKeys.join(', ')}</dd>
        </div>
      </dl>
    </section>
  )
}
