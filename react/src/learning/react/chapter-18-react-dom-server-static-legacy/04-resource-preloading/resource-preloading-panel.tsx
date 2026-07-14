import {
  preconnect,
  prefetchDNS,
  preinit,
  preinitModule,
  preload,
  preloadModule,
} from 'react-dom'
import { resourcePreloadDecisions } from '../sellerhub-dom-boundary-lab/sellerhub-dom-boundary-data'

export function ResourcePreloadingPanel() {
  function prepareLikelyResources(): void {
    prefetchDNS('https://images.sellerhub.example')
    preconnect('https://cdn.sellerhub.example')
    preload('/sellerhub-dashboard.css', { as: 'style' })
    preloadModule('/sellerhub-dashboard-module.js', { as: 'script' })
    preinit('/sellerhub-print.css', { as: 'style' })
    preinitModule('/sellerhub-analytics.js', { as: 'script' })
  }

  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.4 Resource preloading</p>
      <h3>Resource hints are not React lazy boundaries</h3>
      <p>
        Resource preloading APIs hint browser fetch, connection, or evaluation work. They do
        not replace Vite dynamic imports, Suspense, or the browser cache.
      </p>
      <button className="dom-boundary-button" onClick={prepareLikelyResources} type="button">
        Send example resource hints
      </button>
      <ul className="dom-boundary-list">
        {resourcePreloadDecisions.map((decision) => (
          <li key={decision.scenario}>
            <strong>{decision.preferredBoundary}</strong>
            <span>{decision.scenario}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
