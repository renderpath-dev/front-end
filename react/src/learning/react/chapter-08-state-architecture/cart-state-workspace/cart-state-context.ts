import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { CartAction, CartState } from './cart-state-model'

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)
