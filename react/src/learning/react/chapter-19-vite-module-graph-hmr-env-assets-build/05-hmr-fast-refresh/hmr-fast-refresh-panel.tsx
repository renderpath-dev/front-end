import { hmrSideEffectSummary } from './hmr-side-effect-module'

const hmrSteps = [
  'Vite receives a changed module during development.',
  'The HMR graph searches for a module that accepts the update.',
  'dispose stores cleanup data before the replaced module instance is evaluated.',
  'React Fast Refresh decides whether component state can be preserved.',
  'A failed boundary or syntax error falls back to invalidation or full reload.',
] as const

export function HmrFastRefreshPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.5 HMR</p>
      <h3>HMR and React Fast Refresh</h3>
      <p>
        This panel shows the HMR contract without pretending that a test can prove a live
        update. The source module contains guarded import.meta.hot usage and a dispose
        cleanup path.
      </p>
      <ul>
        {hmrSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="vite-boundary-muted">
        HMR context detected in this runtime: {hmrSideEffectSummary.hasHmrContext ? 'yes' : 'no'}.
        Side effect module evaluations: {hmrSideEffectSummary.currentSideEffectCount}.
      </p>
    </article>
  )
}
