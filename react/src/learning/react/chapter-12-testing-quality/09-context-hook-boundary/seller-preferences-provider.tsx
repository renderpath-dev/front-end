import { SellerPreferencesContext } from './seller-preferences-context'
import type { ReactNode } from 'react'
import type { SellerPreferences } from './seller-preferences-context'

type SellerPreferencesProviderProps = {
  children: ReactNode
  value: SellerPreferences
}

export function SellerPreferencesProvider({
  children,
  value,
}: SellerPreferencesProviderProps) {
  return (
    <SellerPreferencesContext value={value}>{children}</SellerPreferencesContext>
  )
}
