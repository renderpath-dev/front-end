import {
  createInitialRequestState,
  reduceRequestState,
} from './request-state-reducer'

export function RequestLifecyclePanel() {
  const pendingState = reduceRequestState(createInitialRequestState<string[]>(), {
    requestId: 'catalog:1',
    type: 'start',
  })

  return (
    <section className="data-fetching-card" aria-labelledby="request-lifecycle-title">
      <p className="data-fetching-card__eyebrow">9.4</p>
      <h2 id="request-lifecycle-title">Request lifecycle state</h2>
      <p>
        Request lifecycle state is separate from confirmed server data. A reducer can
        represent idle, pending, success, empty, error, and refetching without impossible
        boolean combinations.
      </p>
      <p>
        Reducer transition: <strong>{pendingState.status}</strong>.
      </p>
    </section>
  )
}
