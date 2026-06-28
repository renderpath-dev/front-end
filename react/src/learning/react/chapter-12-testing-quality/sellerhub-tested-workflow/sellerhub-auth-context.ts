import { createContext, useContext } from 'react'
import type { SellerAuthValue } from './sellerhub-testing-types'

export const SellerAuthContext = createContext<SellerAuthValue | null>(null)

export function useSellerAuth(): SellerAuthValue {
  const auth = useContext(SellerAuthContext)

  if (!auth) {
    throw new Error('useSellerAuth must be used within SellerAuthProvider')
  }

  return auth
}
