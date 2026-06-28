import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import type { CartAction, CartState } from '../features/cart/cart-model'
import type {
  SellerHubFeatureFlags,
  SellerHubRole,
} from '../shared/flags/feature-flags'
import type { SellerHubLocale } from '../shared/i18n/messages'
import type {
  SellerHubErrorReporter,
} from '../shared/observability/error-reporter'
import type { SellerHubError } from '../shared/errors/normalize-sellerhub-error'

export type SellerHubAppValue = {
  cart: CartState
  cartDispatch: Dispatch<CartAction>
  errorReporter: SellerHubErrorReporter
  errorRevision: number
  flags: SellerHubFeatureFlags
  locale: SellerHubLocale
  release: {
    version: string
    releasedAt: string
  }
  reportError: (feature: string, error: SellerHubError) => void
  role: SellerHubRole
  setLocale: (locale: SellerHubLocale) => void
  setRole: (role: SellerHubRole) => void
}

export const SellerHubAppStateContext = createContext<SellerHubAppValue | null>(null)

export function useSellerHubApp(): SellerHubAppValue {
  const value = useContext(SellerHubAppStateContext)

  if (!value) {
    throw new Error('useSellerHubApp must be used within SellerHubAppContext')
  }

  return value
}
