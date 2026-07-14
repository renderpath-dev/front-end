import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function RouteBody({ routeKey, shouldCrash }: { routeKey: string; shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error(`${routeKey} route body failed during render.`)
  }

  return <p className="recovery-success-note">{routeKey} route body rendered.</p>
}

export function RouteLevelBoundaryPanel() {
  const [routeKey, setRouteKey] = useState('catalog')
  const [shouldCrash, setShouldCrash] = useState(false)

  function switchRoute(nextRouteKey: string) {
    setRouteKey(nextRouteKey)
    setShouldCrash(false)
  }

  return (
    <section className="recovery-card" aria-labelledby="route-level-boundary-title">
      <p className="recovery-card-kicker">9.9</p>
      <h3 id="route-level-boundary-title">Route-level failure containment</h3>
      <p>
        A route boundary keeps global navigation alive while replacing only the failed
        page segment. Route key changes can reset the failed segment.
      </p>
      <nav className="recovery-button-row" aria-label="Route boundary demo">
        <button type="button" onClick={() => switchRoute('catalog')}>
          Catalog route
        </button>
        <button type="button" onClick={() => switchRoute('orders')}>
          Orders route
        </button>
      </nav>
      <ErrorBoundary
        boundaryName={`${routeKey} route boundary`}
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Reset route segment"
        resetKeys={[routeKey]}
      >
        <RouteBody routeKey={routeKey} shouldCrash={shouldCrash} />
      </ErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash current route body
      </button>
    </section>
  )
}
