import { lazy, Suspense } from 'react'

function RouteChunkEvidence() {
  return <p className="sellerhub-status">Lazy route chunk boundary rendered.</p>
}

const LazyRouteChunkEvidence = lazy(async () => ({ default: RouteChunkEvidence }))

export function RouteCodeSplittingPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="route-code-splitting-title">
      <p className="route-card-kicker">Part 12</p>
      <h2 id="route-code-splitting-title">Route-level code splitting boundary</h2>
      <p>
        A lazy route chunk delays JavaScript module loading. It is separate from server data
        loading and should have its own Suspense fallback and error boundary reading.
      </p>
      <Suspense fallback={<p className="sellerhub-warning">Loading route chunk...</p>}>
        <LazyRouteChunkEvidence />
      </Suspense>
    </section>
  )
}
