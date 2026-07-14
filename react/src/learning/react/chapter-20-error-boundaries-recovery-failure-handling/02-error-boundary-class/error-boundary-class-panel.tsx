import { useState } from 'react'
import { ErrorBoundary } from './error-boundary'
import type { ErrorBoundaryFallbackProps } from './error-boundary'

function ClassBoundaryCrash({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Class boundary demo render failure.')
  }

  return <p className="recovery-success-note">The class boundary child is healthy.</p>
}

function ClassBoundaryFallback({
  boundaryName,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  return (
    <section className="recovery-boundary-fallback" role="alert">
      <p className="recovery-card-kicker">{boundaryName}</p>
      <h4>Fallback rendered from fallbackRender.</h4>
      <p>getDerivedStateFromError selected this branch before componentDidCatch logged.</p>
      <button type="button" onClick={resetErrorBoundary}>
        Reset class boundary demo
      </button>
    </section>
  )
}

export function ErrorBoundaryClassPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)
  const [lastLog, setLastLog] = useState('No render error captured yet.')

  return (
    <section className="recovery-card" aria-labelledby="error-boundary-class-title">
      <p className="recovery-card-kicker">9.2</p>
      <h3 id="error-boundary-class-title">Error Boundary class mechanics</h3>
      <p>
        React still defines Error Boundaries through class lifecycle methods. A reusable
        class boundary can protect a function-component workspace.
      </p>
      <ul className="recovery-list">
        <li>getDerivedStateFromError returns fallback state during render recovery.</li>
        <li>componentDidCatch receives the error and component stack for logging.</li>
        <li>fallbackRender keeps user-facing recovery UI separate from logging.</li>
      </ul>
      <ErrorBoundary
        boundaryName="Class boundary"
        fallbackRender={(fallbackProps) => <ClassBoundaryFallback {...fallbackProps} />}
        onError={(error, info) =>
          setLastLog(`${error.message} | stack length ${info.componentStack?.length ?? 0}`)
        }
        onReset={() => setShouldCrash(false)}
      >
        <ClassBoundaryCrash shouldCrash={shouldCrash} />
      </ErrorBoundary>
      <p className="recovery-muted">Last log: {lastLog}</p>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Crash class boundary child
      </button>
    </section>
  )
}
