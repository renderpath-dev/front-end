import { createRequestSequenceGuard } from './request-sequence-guard'

export function RaceConditionStaleResponsePanel() {
  const guard = createRequestSequenceGuard()
  const slowRequestId = guard.startRequest()
  const fastRequestId = guard.startRequest()

  return (
    <section className="data-fetching-card" aria-labelledby="race-condition-title">
      <p className="data-fetching-card__eyebrow">9.6</p>
      <h2 id="race-condition-title">Race condition and stale response guard</h2>
      <p>
        When multiple requests overlap, the older response can finish after the newer
        response. A request identity guard makes the latest request the only response
        allowed to commit.
      </p>
      <p>
        Slow request latest? <strong>{String(guard.isLatest(slowRequestId))}</strong>;
        fast request latest? <strong>{String(guard.isLatest(fastRequestId))}</strong>.
      </p>
    </section>
  )
}
