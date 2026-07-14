import { combineCancellationReasons } from './cancellation-model'

export function TimeoutCancellationPanel() {
  const boundaries = combineCancellationReasons(['timeout', 'filter-change'])

  return (
    <section className="data-fetching-card" aria-labelledby="timeout-cancellation-title">
      <p className="data-fetching-card__eyebrow">9.8</p>
      <h2 id="timeout-cancellation-title">Timeout and combined cancellation</h2>
      <p>
        Timeout, user cancel, route change, and filter change are client request
        boundaries. They improve UI ownership but do not become HTTP status codes.
      </p>
      <p>
        Modeled client signals: <strong>{boundaries.length}</strong>.
      </p>
    </section>
  )
}
