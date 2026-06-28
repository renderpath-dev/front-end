export type CartLine = {
  productId: string
  name: string
  unitPriceInCents: number
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'product-added'; line: Omit<CartLine, 'quantity'> }
  | { type: 'quantity-updated'; productId: string; quantity: number }
  | { type: 'product-removed'; productId: string }
  | { type: 'cart-cleared' }

export const emptyCartState: CartState = { lines: [] }

function assertNever(value: never): never {
  throw new Error(`Unhandled cart action: ${JSON.stringify(value)}`)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'product-added': {
      const existingLine = state.lines.find(
        (line) => line.productId === action.line.productId,
      )

      if (existingLine) {
        return {
          lines: state.lines.map((line) =>
            line.productId === action.line.productId
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
        }
      }

      return { lines: [...state.lines, { ...action.line, quantity: 1 }] }
    }
    case 'quantity-updated':
      return {
        lines: state.lines.map((line) =>
          line.productId === action.productId
            ? { ...line, quantity: Math.max(1, action.quantity) }
            : line,
        ),
      }
    case 'product-removed':
      return {
        lines: state.lines.filter((line) => line.productId !== action.productId),
      }
    case 'cart-cleared':
      return emptyCartState
    default:
      return assertNever(action)
  }
}

export function deriveCartSummary(state: CartState) {
  return state.lines.reduce(
    (summary, line) => ({
      itemCount: summary.itemCount + line.quantity,
      subtotalInCents:
        summary.subtotalInCents + line.unitPriceInCents * line.quantity,
    }),
    { itemCount: 0, subtotalInCents: 0 },
  )
}

function isCartState(value: unknown): value is CartState {
  if (typeof value !== 'object' || value === null || !('lines' in value)) {
    return false
  }

  const lines = (value as { lines: unknown }).lines
  return (
    Array.isArray(lines) &&
    lines.every(
      (line) =>
        typeof line === 'object' &&
        line !== null &&
        typeof (line as CartLine).productId === 'string' &&
        typeof (line as CartLine).name === 'string' &&
        typeof (line as CartLine).unitPriceInCents === 'number' &&
        typeof (line as CartLine).quantity === 'number',
    )
  )
}

export function readCartState(storage: Storage, key: string): CartState {
  const storedValue = storage.getItem(key)

  if (!storedValue) {
    return emptyCartState
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    return isCartState(parsedValue) ? parsedValue : emptyCartState
  } catch {
    return emptyCartState
  }
}

export function writeCartState(storage: Storage, key: string, state: CartState): void {
  storage.setItem(key, JSON.stringify(state))
}
