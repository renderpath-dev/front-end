import { createRequestDiagnosticEvent } from './request-observability-model'
import { sellerHubRequestDiagnostics } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const requestDiagnostics = sellerHubRequestDiagnostics.map(createRequestDiagnosticEvent)

export function AsyncObservabilityPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="async-observability-title">
      <p className="release-evidence-card__eyebrow">9.11</p>
      <h2 id="async-observability-title">Async and data-flow observability</h2>
      <p>
        Request diagnostics preserve request id and resource key while redacting payload
        details. This connects request lifecycle evidence to release triage.
      </p>
      <ul>
        {requestDiagnostics.map((diagnostic) => (
          <li key={diagnostic.requestId}>
            {diagnostic.requestId}: {diagnostic.status}, {diagnostic.payloadSummary}
          </li>
        ))}
      </ul>
    </section>
  )
}
