import { createRequestDiagnosticEvent } from '../11-async-observability/request-observability-model'
import { sellerHubRequestDiagnostics } from './sellerhub-release-evidence-data'

const diagnostics = sellerHubRequestDiagnostics.map(createRequestDiagnosticEvent)

export function AsyncObservabilityCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="async-observability-card-title">
      <h3 id="async-observability-card-title">Async observability card</h3>
      <p>
        Request evidence preserves request id and resource key while summarizing payloads.
      </p>
      <ul>
        {diagnostics.map((diagnostic) => (
          <li key={diagnostic.requestId}>
            {diagnostic.requestId}: {diagnostic.payloadSummary}
          </li>
        ))}
      </ul>
    </section>
  )
}
