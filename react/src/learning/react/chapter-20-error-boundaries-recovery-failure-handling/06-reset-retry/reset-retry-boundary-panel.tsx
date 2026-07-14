import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function RetryableWidget({ version, shouldCrash }: { version: number; shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error(`Retryable widget failed at version ${version}.`)
  }

  return <p className="recovery-success-note">Retryable widget version {version} rendered.</p>
}

export function ResetRetryBoundaryPanel() {
  const [version, setVersion] = useState(1)
  const [shouldCrash, setShouldCrash] = useState(false)

  function recoverWidget() {
    setShouldCrash(false)
    setVersion((currentVersion) => currentVersion + 1)
  }

  return (
    <section className="recovery-card" aria-labelledby="reset-retry-title">
      <p className="recovery-card-kicker">9.6</p>
      <h3 id="reset-retry-title">Reset and retry strategy</h3>
      <p>
        Resetting a boundary only clears its fallback state. The owner must also remove
        the original crash cause or retry will crash again.
      </p>
      <ErrorBoundary
        boundaryName="Reset and retry boundary"
        onReset={recoverWidget}
        resetButtonLabel="Retry with clean input"
        resetKeys={[version]}
      >
        <RetryableWidget version={version} shouldCrash={shouldCrash} />
      </ErrorBoundary>
      <div className="recovery-button-row">
        <button type="button" onClick={() => setShouldCrash(true)}>
          Crash retryable widget
        </button>
        <button type="button" onClick={recoverWidget}>
          Reset cause and version
        </button>
      </div>
    </section>
  )
}
