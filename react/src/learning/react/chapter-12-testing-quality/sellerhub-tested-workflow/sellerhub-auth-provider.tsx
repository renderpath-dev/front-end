import { useMemo, useState } from 'react'
import { SellerAuthContext } from './sellerhub-auth-context'
import type { ReactNode } from 'react'
import type { SellerAuthValue } from './sellerhub-testing-types'

type SellerAuthProviderProps = {
  children: ReactNode
  initialSellerName?: string | null
}

export function SellerAuthProvider({
  children,
  initialSellerName = null,
}: SellerAuthProviderProps) {
  const [sellerName, setSellerName] = useState<string | null>(initialSellerName)

  const authValue = useMemo<SellerAuthValue>(
    () => ({
      isAuthenticated: sellerName !== null,
      sellerName,
      signIn: (nextSellerName) => setSellerName(nextSellerName),
      signOut: () => setSellerName(null),
    }),
    [sellerName],
  )

  return <SellerAuthContext value={authValue}>{children}</SellerAuthContext>
}
