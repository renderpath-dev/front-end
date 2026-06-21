import { createContext, useContext } from 'react'

export type Density = 'comfortable' | 'compact'

export type PerformancePreferences = {
  density: Density
  toggleDensity: () => void
}

export const PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)

export function usePerformancePreferences(): PerformancePreferences {
  const preferences = useContext(PerformancePreferencesContext)

  if (!preferences) {
    throw new Error('usePerformancePreferences requires PerformancePreferencesProvider')
  }

  return preferences
}
