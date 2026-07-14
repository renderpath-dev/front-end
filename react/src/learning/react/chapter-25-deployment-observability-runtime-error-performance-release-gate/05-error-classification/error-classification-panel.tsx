import { classifyRuntimeFailure } from './error-classifier'

const classifications = [
  classifyRuntimeFailure({ message: 'Loading chunk 24 failed' }),
  classifyRuntimeFailure({ message: 'JSON parse failed' }),
  classifyRuntimeFailure({ message: 'Request timeout', name: 'TimeoutError' }),
]

export function ErrorClassificationPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="error-classification-title">
      <p className="release-evidence-card__eyebrow">9.5</p>
      <h2 id="error-classification-title">Error classification</h2>
      <p>
        Classification assigns each failure to a recovery owner. A single generic error
        label hides whether the user needs a retry, reload, fallback, or triage path.
      </p>
      <ul>
        {classifications.map((classification) => (
          <li key={classification.kind}>
            {classification.kind}: {classification.recoveryOwner}
          </li>
        ))}
      </ul>
    </section>
  )
}
