import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function LeafWidget({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Leaf widget render failure reached the nearest boundary.')
  }

  return <p className="recovery-success-note">Leaf widget rendered below the inner boundary.</p>
}

export function RenderErrorPropagationPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="render-error-propagation-title">
      <p className="recovery-card-kicker">9.3</p>
      <h3 id="render-error-propagation-title">Render-time error propagation</h3>
      <p>
        A thrown render error walks up the React component tree until React finds the
        nearest ancestor boundary. Sibling UI outside that boundary can keep rendering.
      </p>
      <div className="recovery-example-pair">
        <article className="recovery-widget-card">
          <h4>Outer sibling</h4>
          <p>This card remains visible when the inner leaf crashes.</p>
        </article>
        <ErrorBoundary
          boundaryName="Inner leaf boundary"
          onReset={() => setShouldCrash(false)}
          resetButtonLabel="Recover leaf widget"
        >
          <LeafWidget shouldCrash={shouldCrash} />
        </ErrorBoundary>
      </div>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash nearest child boundary
      </button>
    </section>
  )
}
