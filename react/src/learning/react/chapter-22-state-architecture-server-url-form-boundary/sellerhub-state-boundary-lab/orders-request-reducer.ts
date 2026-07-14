import { requestStatusReducer } from '../13-request-status/request-status-reducer'
import type {
  RequestAction,
  RequestState,
} from '../13-request-status/request-status-reducer'
import type { SellerHubOrder } from './sellerhub-state-boundary-data'

export type OrdersRequestState = RequestState<SellerHubOrder[]>
export type OrdersRequestAction = RequestAction<SellerHubOrder[]>

export const initialOrdersRequestState: OrdersRequestState = { status: 'idle' }

export function ordersRequestReducer(
  state: OrdersRequestState,
  action: OrdersRequestAction,
): OrdersRequestState {
  return requestStatusReducer(state, action)
}
