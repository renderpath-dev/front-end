import type { CartAction, CartState } from './cart-state-model'
import { createInitialCartState } from './cart-state-model'

function assertNever(action: never): never {
  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)
}

export function cartStateReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'quantity_changed':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: Math.max(1, action.nextQuantity) }
            : item,
        ),
      }
    case 'item_removed':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.itemId),
      }
    case 'cart_cleared':
      return { ...state, items: [] }
    case 'cart_reset':
      return createInitialCartState()
    default:
      return assertNever(action)
  }
}
