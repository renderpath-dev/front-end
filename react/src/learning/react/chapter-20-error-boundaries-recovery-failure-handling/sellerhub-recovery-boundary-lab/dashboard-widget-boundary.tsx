import { useState } from 'react'
import { SellerHubErrorBoundary } from './sellerhub-error-boundary'

function DashboardChart({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Dashboard chart plugin received an invalid series.')
  }

  return (
    <article className="recovery-widget-card">
      <p className="recovery-card-kicker">Dashboard chart</p>
      <h3>Revenue chart rendered inside its widget boundary.</h3>
      <p>Visible series: revenue, refunds, conversion</p>
    </article>
  )
}

export function DashboardWidgetBoundary() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="dashboard-widget-title">
      <h3 id="dashboard-widget-title">Dashboard widget boundary</h3>
      <p>
        A chart plugin should not crash the entire dashboard. The fallback card replaces
        only the failed widget.
      </p>
      <SellerHubErrorBoundary
        boundaryName="Dashboard widget boundary"
        fallbackTitle="Dashboard chart failed safely."
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Recover dashboard widget"
        resetKeys={[shouldCrash]}
      >
        <DashboardChart shouldCrash={shouldCrash} />
      </SellerHubErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash dashboard widget
      </button>
    </section>
  )
}
