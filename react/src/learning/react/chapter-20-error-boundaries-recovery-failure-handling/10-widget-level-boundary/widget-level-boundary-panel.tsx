import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function ChartWidget({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Third-party chart widget failed during render.')
  }

  return <p className="recovery-success-note">Chart widget rendered inside its card.</p>
}

export function WidgetLevelBoundaryPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="widget-level-boundary-title">
      <p className="recovery-card-kicker">9.10</p>
      <h3 id="widget-level-boundary-title">Widget-level and plugin boundaries</h3>
      <p>
        A dashboard should not collapse because one chart, plugin, or optional card
        failed. Widget boundaries trade broad protection for local recovery.
      </p>
      <div className="recovery-example-pair">
        <article className="recovery-widget-card">
          <h4>Stable KPI card</h4>
          <p>This sibling card stays visible.</p>
        </article>
        <ErrorBoundary
          boundaryName="Chart widget boundary"
          onReset={() => setShouldCrash(false)}
          resetButtonLabel="Recover chart widget"
        >
          <ChartWidget shouldCrash={shouldCrash} />
        </ErrorBoundary>
      </div>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash chart widget
      </button>
    </section>
  )
}
