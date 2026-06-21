import type { SellerOrdersAction, SellerOrdersState } from './seller-order-types'

export const initialSellerOrdersState: SellerOrdersState = {
  status: 'pending',
  orders: [],
}

function assertNever(action: never): never {
  throw new Error(`Unhandled seller orders action: ${JSON.stringify(action)}`)
}

export function sellerOrdersReducer(
  state: SellerOrdersState,
  action: SellerOrdersAction,
): SellerOrdersState {
  switch (action.type) {
    case 'request_started':
      return { status: 'pending', orders: state.orders }
    case 'request_succeeded':
      return action.orders.length === 0
        ? { status: 'empty', orders: [] }
        : { status: 'success', orders: action.orders }
    case 'request_failed':
      return { status: 'error', orders: state.orders, message: action.message }
    default:
      return assertNever(action)
  }
}
