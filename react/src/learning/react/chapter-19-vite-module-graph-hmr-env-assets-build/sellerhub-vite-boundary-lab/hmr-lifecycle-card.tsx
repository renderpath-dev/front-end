import { hmrLifecycleSteps } from './sellerhub-vite-boundary-data'

export function HmrLifecycleCard() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>HMR lifecycle card</h3>
      <p>
        This card describes the development contract. It does not claim that a test can
        perform a live browser HMR swap.
      </p>
      <ol>
        {hmrLifecycleSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </article>
  )
}
