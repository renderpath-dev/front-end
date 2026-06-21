import { useReducer } from 'react'

type CartState = {
  quantity: number
}

type CartAction =
  | { type: 'item_added' }
  | { type: 'item_removed' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'item_added':
      return { quantity: state.quantity + 1 }
    case 'item_removed':
      return { quantity: Math.max(0, state.quantity - 1) }
  }
}

export function CartReducerTransition() {
  const [cart, dispatch] = useReducer(cartReducer, { quantity: 1 })

  return (
    <article className="practice-card">
      <p className="practice-label">Reducer model</p>
      <h3>Describe transitions with actions</h3>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'item_removed' })}>Remove one</button>
        <button onClick={() => dispatch({ type: 'item_added' })}>Add one</button>
      </div>
      <p>Quantity: {cart.quantity}</p>
    </article>
  )
}
