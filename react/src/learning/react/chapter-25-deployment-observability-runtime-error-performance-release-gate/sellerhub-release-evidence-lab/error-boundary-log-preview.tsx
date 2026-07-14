import { sellerHubRuntimeDiagnostic } from './sellerhub-release-evidence-data'

export function ErrorBoundaryLogPreview() {
  return (
    <section className="release-evidence-card" aria-labelledby="error-boundary-log-title">
      <h3 id="error-boundary-log-title">Error Boundary log preview</h3>
      <p>
        Error Boundary evidence keeps the fallback message separate from the developer
        diagnostic.
      </p>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Correlation id</dt>
          <dd>{sellerHubRuntimeDiagnostic.correlationId}</dd>
        </div>
        <div>
          <dt>Component stack</dt>
          <dd>{sellerHubRuntimeDiagnostic.componentStack}</dd>
        </div>
      </dl>
    </section>
  )
}
