import {
  createInitialRequestState,
  reduceRequestState,
} from '../04-request-lifecycle/request-state-reducer'

export function AsyncUiStatePanel() {
  const pendingState = reduceRequestState(createInitialRequestState<string[]>(), {
    requestId: 'orders:1',
    type: 'start',
  })
  const errorState = reduceRequestState(pendingState, {
    error: { message: 'Malformed response payload', reason: 'parse' },
    requestId: 'orders:1',
    type: 'reject',
  })

  return (
    <section className="data-fetching-card" aria-labelledby="async-ui-title">
      <p className="data-fetching-card__eyebrow">9.15</p>
      <h2 id="async-ui-title">Loading, empty, partial, and error UI</h2>
      <p>
        Accessible async UI should distinguish initial loading, refetching with previous
        data, empty results, parse errors, HTTP errors, network errors, and retry actions.
      </p>
      <p role={errorState.status === 'error' ? 'alert' : 'status'}>
        Async UI state: <strong>{errorState.status}</strong>.
      </p>
    </section>
  )
}
