import { useState } from 'react'
import {
  preconnect,
  prefetchDNS,
  preinit,
  preinitModule,
  preload,
  preloadModule,
} from 'react-dom'
import { resourcePreloadDecisions } from './sellerhub-dom-boundary-data'

export function ResourcePreloadDecisionPanel() {
  const [lastAction, setLastAction] = useState('No resource hint has been requested yet.')

  function sendHints(): void {
    prefetchDNS('https://images.sellerhub.example')
    preconnect('https://cdn.sellerhub.example')
    preload('/sellerhub-dashboard.css', { as: 'style' })
    preloadModule('/sellerhub-dashboard-module.js', { as: 'script' })
    preinit('/sellerhub-print.css', { as: 'style' })
    preinitModule('/sellerhub-analytics.js', { as: 'script' })
    setLastAction('Example hints were requested from React DOM resource APIs.')
  }

  return (
    <section className="dom-boundary-card" aria-labelledby="resource-preload-title">
      <p className="dom-boundary-kicker">Resource hints</p>
      <h3 id="resource-preload-title">Resource preload decision panel</h3>
      <p>
        Resource hints prepare browser work. They are separate from Vite dynamic imports,
        Suspense, and React lazy code splitting.
      </p>
      <button className="dom-boundary-button" onClick={sendHints} type="button">
        Request example hints
      </button>
      <p className="dom-boundary-muted">{lastAction}</p>
      <ul className="dom-boundary-list">
        {resourcePreloadDecisions.map((decision) => (
          <li key={decision.scenario}>
            <strong>{decision.preferredBoundary}</strong>
            <span>{decision.evidence}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
