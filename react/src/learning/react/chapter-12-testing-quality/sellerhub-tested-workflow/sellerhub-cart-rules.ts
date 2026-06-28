import type { CartAction, CartState } from './sellerhub-testing-types'

export function parseCatalogFilterQuery(rawQuery: string): string {
  return rawQuery.trim().replace(/\s+/g, ' ').toLowerCase()
}

export function sellerCartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'addLine':
      if (state.lines.some((line) => line.id === action.line.id)) {
        return state
      }

      return { lines: [...state.lines, action.line] }

    case 'setQuantity':
      return {
        lines: state.lines.map((line) =>
          line.id === action.lineId ? { ...line, quantity: action.quantity } : line,
        ),
      }

    case 'removeLine':
      return { lines: state.lines.filter((line) => line.id !== action.lineId) }

    default:
      return assertNever(action)
  }
}

function assertNever(action: never): never {
  throw new Error(`Unhandled seller cart action: ${JSON.stringify(action)}`)
}
