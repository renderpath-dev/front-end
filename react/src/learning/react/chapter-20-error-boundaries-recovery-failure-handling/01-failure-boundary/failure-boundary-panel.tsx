import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function RenderCrashProbe({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Child render failed after the parent already returned JSX.')
  }

  return (
    <article className="recovery-widget-card">
      <p className="recovery-card-kicker">Safe child render</p>
      <h4>The child rendered normally.</h4>
      <p>A parent try/catch around JSX creation does not own this child render call.</p>
    </article>
  )
}

export function FailureBoundaryPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="failure-boundary-title">
      <p className="recovery-card-kicker">9.1</p>
      <h3 id="failure-boundary-title">Failure boundary positioning</h3>
      <p>
        JSX creates element descriptions. React later calls child components during render,
        so a normal parent try/catch around returned JSX is not the recovery boundary.
      </p>

      <div className="recovery-example-pair">
        <article className="recovery-code-card">
          <h4>Wrong owner</h4>
          <code>try return &lt;RiskyChild /&gt;</code>
          <p>The parent catches errors from creating the element, not from child render.</p>
        </article>
        <article className="recovery-code-card">
          <h4>Correct owner</h4>
          <code>&lt;ErrorBoundary&gt;&lt;RiskyChild /&gt;&lt;/ErrorBoundary&gt;</code>
          <p>The nearest boundary owns the render-time failure from descendants.</p>
        </article>
      </div>

      <ErrorBoundary
        boundaryName="Failure boundary demo"
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Reset child render"
      >
        <RenderCrashProbe shouldCrash={shouldCrash} />
      </ErrorBoundary>

      <button type="button" onClick={() => setShouldCrash(true)}>
        Throw during child render
      </button>
    </section>
  )
}
