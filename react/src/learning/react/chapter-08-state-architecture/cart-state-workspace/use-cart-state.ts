import { useContext } from 'react'
import { CartDispatchContext, CartStateContext } from './cart-state-context'

export function useCartState() {
  const state = useContext(CartStateContext)

  if (state === null) {
    throw new Error('useCartState must be used within CartStateProvider')
  }

  return state
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext)

  if (dispatch === null) {
    throw new Error('useCartDispatch must be used within CartStateProvider')
  }

  return dispatch
}
