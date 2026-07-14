import { useState } from 'react'
import { SellerHubErrorBoundary } from './sellerhub-error-boundary'

function CatalogMetricCard({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Catalog metric card cannot format the active listing count.')
  }

  return (
    <article className="recovery-widget-card">
      <p className="recovery-card-kicker">Catalog metric</p>
      <h3>Active listings are stable.</h3>
      <p>Active listings: 128</p>
    </article>
  )
}

export function CatalogCrashLab() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="catalog-crash-title">
      <h3 id="catalog-crash-title">Catalog crash lab</h3>
      <p>
        The button below flips a render-time condition. The nearest widget boundary
        catches the thrown error and keeps the rest of the lab visible.
      </p>
      <SellerHubErrorBoundary
        boundaryName="Catalog widget boundary"
        fallbackTitle="Catalog card failed safely."
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Recover catalog card"
        resetKeys={[shouldCrash]}
      >
        <CatalogMetricCard shouldCrash={shouldCrash} />
      </SellerHubErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash catalog card
      </button>
    </section>
  )
}
