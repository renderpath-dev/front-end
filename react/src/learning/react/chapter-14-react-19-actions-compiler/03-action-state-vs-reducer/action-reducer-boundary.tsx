import { startTransition, useActionState, useReducer } from 'react'

type DraftState = {
  quantity: number
}

type DraftAction =
  | { type: 'increment' }
  | { type: 'decrement' }

type SaveState = {
  status: 'idle' | 'saved'
  savedQuantity: number
  saveCount: number
}

function draftReducer(state: DraftState, action: DraftAction): DraftState {
  switch (action.type) {
    case 'increment':
      return { quantity: state.quantity + 1 }
    case 'decrement':
      return { quantity: Math.max(1, state.quantity - 1) }
    default:
      return assertNever(action)
  }
}

async function saveQuantityAction(
  previousState: SaveState,
  quantity: number,
): Promise<SaveState> {
  await wait(450)

  return {
    status: 'saved',
    savedQuantity: quantity,
    saveCount: previousState.saveCount + 1,
  }
}

export function ActionReducerBoundary() {
  const [draft, dispatchDraft] = useReducer(draftReducer, { quantity: 1 })
  const [saveState, dispatchSave, isPending] = useActionState(saveQuantityAction, {
    status: 'idle',
    savedQuantity: 1,
    saveCount: 0,
  } satisfies SaveState)

  function saveDraft(): void {
    startTransition(() => {
      dispatchSave(draft.quantity)
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="reducer-action-title">
      <p className="chapter14-kicker">9.3 Reducer and Action boundary</p>
      <h2 id="reducer-action-title">Pure draft transitions and effectful save Actions</h2>
      <div className="chapter14-grid">
        <article className="chapter14-card">
          <h3>useReducer</h3>
          <p>Draft quantity: {draft.quantity}</p>
          <div className="chapter14-action-row">
            <button
              className="chapter14-button"
              onClick={() => dispatchDraft({ type: 'decrement' })}
              type="button"
            >
              Decrease draft
            </button>
            <button
              className="chapter14-button"
              onClick={() => dispatchDraft({ type: 'increment' })}
              type="button"
            >
              Increase draft
            </button>
          </div>
        </article>
        <article className="chapter14-card">
          <h3>useActionState</h3>
          <p>Saved quantity: {saveState.savedQuantity}</p>
          <p>Completed saves: {saveState.saveCount}</p>
          <button
            className="chapter14-button"
            disabled={isPending}
            onClick={saveDraft}
            type="button"
          >
            {isPending ? 'Saving...' : 'Save draft'}
          </button>
        </article>
      </div>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

function assertNever(value: never): never {
  throw new Error(`Unhandled draft action: ${JSON.stringify(value)}`)
}
