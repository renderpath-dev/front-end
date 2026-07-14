import { useReducer } from 'react'
import {
  initialOrderWorkflowState,
  orderWorkflowReducer,
} from './order-workflow-reducer'

export function ReducerTransitionPanel() {
  const [state, dispatch] = useReducer(orderWorkflowReducer, initialOrderWorkflowState)

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.7 reducer transitions</p>
      <h3>Reducer state machine boundary</h3>
      <p>
        The reducer accepts user intent as action objects and blocks transitions that would create
        impossible workflow states.
      </p>
      <div className="state-button-row">
        <button type="button" onClick={() => dispatch({ type: 'select', orderId: 'ord-7001' })}>
          Select order
        </button>
        <button type="button" onClick={() => dispatch({ type: 'review' })}>
          Review
        </button>
        <button type="button" onClick={() => dispatch({ type: 'submit' })}>
          Submit
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'confirm', confirmationCode: 'CNF-22' })}
        >
          Confirm
        </button>
      </div>
      <p role="status">Workflow status: {state.status}</p>
    </article>
  )
}
