import { createSourceMapReleaseRecord } from './source-map-release-model'
import { chapter25ReleaseId } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const sourceMapRecord = createSourceMapReleaseRecord({
  exposure: 'private-upload-only',
  mapFileCount: 3,
  releaseId: chapter25ReleaseId,
  uploadTarget: 'private-monitoring-upload-boundary',
})

export function SourceMapBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="source-map-title">
      <p className="release-evidence-card__eyebrow">9.6</p>
      <h2 id="source-map-title">Source map boundary</h2>
      <p>
        Source maps connect minified stacks to release source context. This lab records
        release metadata and privacy boundaries, but it does not upload source maps.
      </p>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Upload ready</dt>
          <dd>{sourceMapRecord.uploadReady ? 'yes' : 'no'}</dd>
        </div>
        <div>
          <dt>Upload performed</dt>
          <dd>{sourceMapRecord.uploadPerformed ? 'yes' : 'no'}</dd>
        </div>
      </dl>
    </section>
  )
}
