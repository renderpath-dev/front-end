import { useEffect, useState } from 'react'
import {
  createFirstRenderPlan,
  readBrowserPreferenceSafely,
} from './browser-api-guard-model'

export function BrowserApiGuardPanel() {
  const [storedPreference, setStoredPreference] = useState('system')
  const firstRenderPlan = createFirstRenderPlan('system')

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const result = readBrowserPreferenceSafely(
        window.localStorage,
        'sellerhub-theme',
        'system',
      )

      setStoredPreference(result.value)
    }, 0)

    return () => window.clearTimeout(timerId)
  }, [])

  return (
    <section className="chapter13-panel" aria-labelledby="browser-guard-title">
      <p className="chapter13-kicker">Browser API guard</p>
      <h2 id="browser-guard-title">Browser-only APIs belong after hydration or inside client logic</h2>
      <p>
        The first server output and first client render both use the same fallback.
        Storage can update the UI after React has attached to the HTML.
      </p>
      <div className="chapter13-grid">
        {firstRenderPlan.map((step) => (
          <article className="chapter13-card" key={step.phase}>
            <h3>{step.phase}</h3>
            <p>Value: {step.value}</p>
            <p>Source: {step.source}</p>
          </article>
        ))}
        <article className="chapter13-card">
          <h3>after-hydration</h3>
          <p>Value: {storedPreference}</p>
          <p>Source: browser effect</p>
        </article>
      </div>
    </section>
  )
}
