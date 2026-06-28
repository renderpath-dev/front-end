import { startTransition, useActionState, useRef } from 'react'

type QuantityActionState = {
  quantity: number
  completedActions: string[]
}

type QuantityActionPayload = {
  delta: number
  requestId: string
}

const initialQuantityState: QuantityActionState = {
  quantity: 1,
  completedActions: [],
}

async function updateQuantityAction(
  previousState: QuantityActionState,
  payload: QuantityActionPayload,
): Promise<QuantityActionState> {
  await wait(payload.delta > 0 ? 500 : 250)

  return {
    quantity: Math.max(1, previousState.quantity + payload.delta),
    completedActions: [...previousState.completedActions, payload.requestId],
  }
}

export function SequentialActionQueue() {
  const [state, dispatchAction, isPending] = useActionState(
    updateQuantityAction,
    initialQuantityState,
  )
  const nextRequestId = useRef(1)

  function queueQuantityChange(delta: number): void {
    const requestId = `quantity-${nextRequestId.current}`
    nextRequestId.current += 1

    startTransition(() => {
      dispatchAction({ delta, requestId })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="action-queue-title">
      <p className="chapter14-kicker">9.2 useActionState queue</p>
      <h2 id="action-queue-title">Sequential quantity mutations</h2>
      <div className="chapter14-action-row">
        <button
          className="chapter14-button"
          onClick={() => queueQuantityChange(-1)}
          type="button"
        >
          Decrease
        </button>
        <strong className="chapter14-metric">{state.quantity}</strong>
        <button
          className="chapter14-button"
          onClick={() => queueQuantityChange(1)}
          type="button"
        >
          Increase
        </button>
      </div>
      <p className="chapter14-note">
        {isPending
          ? 'The Action queue is processing in dispatch order.'
          : 'Queue multiple changes quickly to observe sequential completion.'}
      </p>
      <ol className="chapter14-compact-list">
        {state.completedActions.map((requestId) => (
          <li key={requestId}>{requestId}</li>
        ))}
      </ol>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
