import { useCallback, useEffect, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import {
  cartReducer,
  emptyCartState,
  readCartState,
  writeCartState,
} from '../features/cart/cart-model'
import type { CartState } from '../features/cart/cart-model'
import { defaultSellerHubFeatureFlags } from '../shared/flags/feature-flags'
import type { SellerHubRole } from '../shared/flags/feature-flags'
import type { SellerHubLocale } from '../shared/i18n/messages'
import { createSellerHubErrorReporter } from '../shared/observability/error-reporter'
import { SellerHubAppStateContext } from './sellerhub-app-state'

const cartStorageKey = 'sellerhub-capstone-cart'

type SellerHubAppContextProps = {
  children: ReactNode
  initialCart?: CartState
}

function getBrowserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : (window.localStorage ?? null)
  } catch {
    return null
  }
}

export function SellerHubAppContext({
  children,
  initialCart,
}: SellerHubAppContextProps) {
  const [browserStorage] = useState(getBrowserStorage)
  const [cart, cartDispatch] = useReducer(
    cartReducer,
    initialCart ??
      (browserStorage
        ? readCartState(browserStorage, cartStorageKey)
        : emptyCartState),
  )
  const [locale, setLocale] = useState<SellerHubLocale>('en-US')
  const [role, setRole] = useState<SellerHubRole>('seller')
  const [errorReporter] = useState(createSellerHubErrorReporter)
  const [errorRevision, setErrorRevision] = useState(0)

  useEffect(() => {
    if (browserStorage) {
      writeCartState(browserStorage, cartStorageKey, cart)
    }
  }, [browserStorage, cart])

  const reportError = useCallback(
    (feature: string, error: Parameters<typeof errorReporter.report>[1]) => {
      errorReporter.report(
        {
          feature,
          privacy: 'no-sensitive-payload',
          release: '16.0.0-local',
          route: typeof window === 'undefined' ? 'unknown' : window.location.pathname,
        },
        error,
      )
      setErrorRevision((revision) => revision + 1)
    },
    [errorReporter],
  )

  return (
    <SellerHubAppStateContext
      value={{
        cart,
        cartDispatch,
        errorReporter,
        errorRevision,
        flags: defaultSellerHubFeatureFlags,
        locale,
        release: {
          version: '16.0.0-local',
          releasedAt: '2026-06-28T09:00:00.000Z',
        },
        reportError,
        role,
        setLocale,
        setRole,
      }}
    >
      {children}
    </SellerHubAppStateContext>
  )
}
