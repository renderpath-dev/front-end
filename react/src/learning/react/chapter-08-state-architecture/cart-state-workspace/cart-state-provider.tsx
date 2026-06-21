import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { CartDispatchContext, CartStateContext } from './cart-state-context'
import { createInitialCartState } from './cart-state-model'
import { cartStateReducer } from './cart-state-reducer'

type CartStateProviderProps = {
  children: ReactNode
}

export function CartStateProvider({ children }: CartStateProviderProps) {
  const [state, dispatch] = useReducer(
    cartStateReducer,
    undefined,
    createInitialCartState,
  )

  return (
    <CartStateContext value={state}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartStateContext>
  )
}
