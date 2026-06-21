import { createContext, useContext } from 'react'
import type { SellerOrdersResource } from './seller-order-types'

export const SellerOrdersContext = createContext<SellerOrdersResource | null>(null)

export function useSellerOrdersContext(): SellerOrdersResource {
  const value = useContext(SellerOrdersContext)

  if (value === null) {
    throw new Error('useSellerOrdersContext must be used within SellerOrdersProvider')
  }

  return value
}
