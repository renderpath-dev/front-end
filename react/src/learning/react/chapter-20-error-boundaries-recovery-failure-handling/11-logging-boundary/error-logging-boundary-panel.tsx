import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function LoggingBoundaryCrash({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Logging boundary captured this render failure.')
  }

  return <p className="recovery-success-note">Logging boundary demo is idle.</p>
}

export function ErrorLoggingBoundaryPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)
  const [logPreview, setLogPreview] = useState('No component stack captured yet.')

  return (
    <section className="recovery-card" aria-labelledby="logging-boundary-title">
      <p className="recovery-card-kicker">9.11</p>
      <h3 id="logging-boundary-title">Logging boundary</h3>
      <p>
        componentDidCatch is the side-effect path for safe diagnostics. Logging records
        error evidence, but fallback UI still comes from boundary state.
      </p>
      <ErrorBoundary
        boundaryName="Logging boundary"
        onError={(error, info) =>
          setLogPreview(`${error.message} | componentStack ${info.componentStack?.length ?? 0}`)
        }
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Reset logging boundary"
      >
        <LoggingBoundaryCrash shouldCrash={shouldCrash} />
      </ErrorBoundary>
      <article className="recovery-code-card">
        <h4>Safe logging note</h4>
        <p>{logPreview}</p>
        <p>Development owner stacks are diagnostic-only and should not be shown to users.</p>
      </article>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Capture logging boundary error
      </button>
    </section>
  )
}
