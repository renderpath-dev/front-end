import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react'

type Density = 'comfortable' | 'compact'

type PerformancePreferences = {
  density: Density
  toggleDensity: () => void
}

const PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)

const MemoizedPreferenceConsumer = memo(function PreferenceConsumer() {
  const preferences = useContext(PerformancePreferencesContext)

  if (!preferences) {
    throw new Error('PreferenceConsumer requires PerformancePreferencesContext')
  }

  return (
    <section className="performance-result-box">
      <strong>Context consumer</strong>
      <p>Density: {preferences.density}</p>
      <button onClick={preferences.toggleDensity} type="button">
        Toggle density
      </button>
    </section>
  )
})

export function ContextValueIdentityBoundary() {
  const [density, setDensity] = useState<Density>('comfortable')
  const [unrelatedTick, setUnrelatedTick] = useState(0)
  const toggleDensity = useCallback(() => {
    setDensity((currentDensity) =>
      currentDensity === 'comfortable' ? 'compact' : 'comfortable',
    )
  }, [])
  const contextValue = useMemo(
    () => ({ density, toggleDensity }),
    [density, toggleDensity],
  )

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">10 / Context value identity</p>
      <h2>Consumers update when the provided value changes by Object.is</h2>
      <button onClick={() => setUnrelatedTick((tick) => tick + 1)} type="button">
        Re-render provider owner ({unrelatedTick})
      </button>
      <PerformancePreferencesContext.Provider value={contextValue}>
        <MemoizedPreferenceConsumer />
      </PerformancePreferencesContext.Provider>
      <p className="performance-practice-note">
        The memoized value stays stable during unrelated owner updates.
      </p>
    </article>
  )
}
