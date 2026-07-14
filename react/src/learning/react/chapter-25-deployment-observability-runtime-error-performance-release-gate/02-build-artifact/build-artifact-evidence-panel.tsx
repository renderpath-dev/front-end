import { summarizeBuildArtifact } from './build-artifact-model'
import { sellerHubBuildAssets } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const artifactSummary = summarizeBuildArtifact({
  assets: sellerHubBuildAssets,
  basePath: '/',
  distPath: 'dist',
  mode: 'local-preview',
})

export function BuildArtifactEvidencePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="build-artifact-title">
      <p className="release-evidence-card__eyebrow">9.2</p>
      <h2 id="build-artifact-title">Build artifact evidence</h2>
      <p>
        The model distinguishes a static artifact, a local Vite preview, and a production
        host. Local preview is useful evidence, but it is not a production server.
      </p>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Boundary</dt>
          <dd>{artifactSummary.environmentLabel}</dd>
        </div>
        <div>
          <dt>Route chunks</dt>
          <dd>{artifactSummary.routeChunkCount}</dd>
        </div>
        <div>
          <dt>Preview equals production</dt>
          <dd>{artifactSummary.previewIsProduction ? 'yes' : 'no'}</dd>
        </div>
      </dl>
    </section>
  )
}
