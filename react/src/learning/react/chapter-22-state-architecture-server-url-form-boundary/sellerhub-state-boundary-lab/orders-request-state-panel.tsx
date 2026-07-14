import { useReducer } from 'react'
import { sellerHubOrders } from './sellerhub-state-boundary-data'
import {
  initialOrdersRequestState,
  ordersRequestReducer,
} from './orders-request-reducer'

export function OrdersRequestStatePanel() {
  const [state, dispatch] = useReducer(ordersRequestReducer, initialOrdersRequestState)

  return (
    <section className="state-lab-card" aria-labelledby="orders-request-title">
      <p className="state-card-kicker">Final lab part 3</p>
      <h3 id="orders-request-title">Orders request state panel</h3>
      <div className="state-button-row">
        <button type="button" onClick={() => dispatch({ type: 'start' })}>
          Start request
        </button>
        <button type="button" onClick={() => dispatch({ type: 'resolve', data: sellerHubOrders })}>
          Resolve orders
        </button>
        <button type="button" onClick={() => dispatch({ type: 'resolve-empty' })}>
          Resolve empty
        </button>
        <button type="button" onClick={() => dispatch({ type: 'reject', message: 'Network error' })}>
          Reject request
        </button>
      </div>
      <p role="status">Orders request status: {state.status}</p>
      {state.status === 'success' || state.status === 'refetching' ? (
        <p>Order rows: {state.data.length}</p>
      ) : null}
      {state.status === 'error' ? <p className="state-error">{state.message}</p> : null}
    </section>
  )
}
