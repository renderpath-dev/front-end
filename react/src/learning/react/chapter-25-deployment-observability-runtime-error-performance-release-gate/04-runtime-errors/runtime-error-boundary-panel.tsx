import { normalizeUnhandledRejection, normalizeWindowErrorEvent } from './runtime-error-model'
import { chapter25ReleaseId } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const windowDiagnostic = normalizeWindowErrorEvent({
  correlationId: 'corr-window-001',
  error: new Error('Catalog render failed for seller@example.com?token=abc'),
  releaseId: chapter25ReleaseId,
  route: '/react/chapter-25',
})

const rejectionDiagnostic = normalizeUnhandledRejection({
  correlationId: 'corr-promise-001',
  reason: 'Orders request rejected without handler',
  releaseId: chapter25ReleaseId,
  route: '/react/chapter-25',
})

export function RuntimeErrorBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="runtime-error-title">
      <p className="release-evidence-card__eyebrow">9.4</p>
      <h2 id="runtime-error-title">Runtime error boundary</h2>
      <p>
        Window errors, unhandled promise rejections, and Error Boundary failures produce
        different diagnostic events. Logging evidence is separate from user recovery.
      </p>
      <ul>
        <li>{windowDiagnostic.source}: {windowDiagnostic.message}</li>
        <li>{rejectionDiagnostic.source}: {rejectionDiagnostic.message}</li>
      </ul>
    </section>
  )
}
