import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'

type SelectionState = {
  orderId: string | null
}

type SelectionAction =
  | { type: 'order_selected'; orderId: string }
  | { type: 'selection_cleared' }

const SelectionStateContext = createContext<SelectionState | null>(null)
const SelectionDispatchContext = createContext<Dispatch<SelectionAction> | null>(null)

function selectionReducer(
  _state: SelectionState,
  action: SelectionAction,
): SelectionState {
  switch (action.type) {
    case 'order_selected':
      return { orderId: action.orderId }
    case 'selection_cleared':
      return { orderId: null }
  }
}

function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectionReducer, { orderId: null })

  return (
    <SelectionStateContext value={state}>
      <SelectionDispatchContext value={dispatch}>{children}</SelectionDispatchContext>
    </SelectionStateContext>
  )
}

function DeepOrderControls() {
  const state = useContext(SelectionStateContext)
  const dispatch = useContext(SelectionDispatchContext)

  if (state === null || dispatch === null) {
    throw new Error('DeepOrderControls must be used within SelectionProvider')
  }

  return (
    <div>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'order_selected', orderId: 'ORD-508' })}>
          Select ORD-508
        </button>
        <button onClick={() => dispatch({ type: 'selection_cleared' })}>Clear</button>
      </div>
      <p>Selected: {state.orderId ?? 'none'}</p>
    </div>
  )
}

export function ReducerContextBoundary() {
  return (
    <article className="practice-card">
      <p className="practice-label">Reducer with context</p>
      <h3>Separate transition logic from delivery</h3>
      <SelectionProvider>
        <DeepOrderControls />
      </SelectionProvider>
    </article>
  )
}
