export type CartLine = {
  id: string
  name: string
  unitPrice: number
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'addLine'; line: CartLine }
  | { type: 'changeQuantity'; lineId: string; quantity: number }
  | { type: 'removeLine'; lineId: string }

export function normalizeCatalogSearch(rawSearch: string): string {
  return rawSearch.trim().replace(/\s+/g, ' ').toLowerCase()
}

export function parsePositiveQuantity(rawQuantity: string): number | null {
  const quantity = Number(rawQuantity)

  if (!Number.isInteger(quantity) || quantity < 1) {
    return null
  }

  return quantity
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'addLine':
      if (state.lines.some((line) => line.id === action.line.id)) {
        return state
      }

      return { lines: [...state.lines, action.line] }

    case 'changeQuantity':
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
  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)
}
