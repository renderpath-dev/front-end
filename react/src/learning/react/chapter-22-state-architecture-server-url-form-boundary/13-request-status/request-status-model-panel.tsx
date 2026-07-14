import { useReducer } from 'react'
import { sellerHubOrders } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'
import { requestStatusReducer } from './request-status-reducer'
import type { SellerHubOrder } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'
import type { RequestState } from './request-status-reducer'

const initialState: RequestState<SellerHubOrder[]> = { status: 'idle' }

export function RequestStatusModelPanel() {
  const [state, dispatch] = useReducer(requestStatusReducer<SellerHubOrder[]>, initialState)

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.13 request lifecycle</p>
      <h3>Request status model</h3>
      <div className="state-button-row">
        <button type="button" onClick={() => dispatch({ type: 'start' })}>
          Start request
        </button>
        <button type="button" onClick={() => dispatch({ type: 'resolve', data: sellerHubOrders })}>
          Resolve data
        </button>
        <button type="button" onClick={() => dispatch({ type: 'reject', message: 'Network error' })}>
          Reject
        </button>
      </div>
      <p role="status">Request status: {state.status}</p>
    </article>
  )
}
