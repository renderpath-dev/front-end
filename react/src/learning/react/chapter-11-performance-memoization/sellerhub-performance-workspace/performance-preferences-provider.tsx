import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { PerformancePreferencesContext } from './performance-preferences-context'
import type { Density } from './performance-preferences-context'

export function PerformancePreferencesProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<Density>('comfortable')
  const toggleDensity = useCallback(() => {
    setDensity((currentDensity) =>
      currentDensity === 'comfortable' ? 'compact' : 'comfortable',
    )
  }, [])
  const value = useMemo(() => ({ density, toggleDensity }), [density, toggleDensity])

  return (
    <PerformancePreferencesContext.Provider value={value}>
      {children}
    </PerformancePreferencesContext.Provider>
  )
}
