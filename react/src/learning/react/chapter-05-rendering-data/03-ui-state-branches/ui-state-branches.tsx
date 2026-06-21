import { useState } from 'react'

type UiState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; items: string[] }

function UiStatePreview({ state }: { state: UiState }) {
  if (state.status === 'loading') {
    return <p className="state-message">Loading products...</p>
  }

  if (state.status === 'error') {
    return <p className="state-message state-message-error">{state.message}</p>
  }

  if (state.status === 'empty') {
    return <p className="state-message">No products match this view.</p>
  }

  return (
    <ul className="compact-list">
      {state.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function UiStateBranches() {
  const [state, setState] = useState<UiState>({
    status: 'success',
    items: ['Mechanical Keyboard', 'Ergonomic Chair'],
  })

  return (
    <article className="practice-panel">
      <p className="practice-kicker">03 · UI state branches</p>
      <h2>Four states, four explicit branches</h2>
      <div className="practice-actions" aria-label="Choose a UI state">
        <button type="button" onClick={() => setState({ status: 'loading' })}>
          Loading
        </button>
        <button
          type="button"
          onClick={() => setState({ status: 'error', message: 'Products could not load.' })}
        >
          Error
        </button>
        <button type="button" onClick={() => setState({ status: 'empty' })}>
          Empty
        </button>
        <button
          type="button"
          onClick={() =>
            setState({
              status: 'success',
              items: ['Mechanical Keyboard', 'Ergonomic Chair'],
            })
          }
        >
          Success
        </button>
      </div>
      <div className="state-preview" aria-live="polite">
        <UiStatePreview state={state} />
      </div>
    </article>
  )
}
