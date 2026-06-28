import { createContext, useContext } from 'react'

export type SellerPreferences = {
  currency: 'USD' | 'EUR'
  compactMode: boolean
}

export const SellerPreferencesContext = createContext<SellerPreferences | null>(null)

export function useSellerPreferences(): SellerPreferences {
  const preferences = useContext(SellerPreferencesContext)

  if (!preferences) {
    throw new Error('useSellerPreferences must be used within SellerPreferencesProvider')
  }

  return preferences
}
