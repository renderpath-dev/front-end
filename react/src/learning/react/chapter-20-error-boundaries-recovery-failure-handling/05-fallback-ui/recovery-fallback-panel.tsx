import { useState } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

function FallbackCrash({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Sensitive stack detail stays out of the user fallback.')
  }

  return <p className="recovery-success-note">Fallback demo content is available.</p>
}

export function RecoveryFallbackPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="fallback-ui-title">
      <p className="recovery-card-kicker">9.5</p>
      <h3 id="fallback-ui-title">Fallback UI and user trust</h3>
      <p>
        A fallback is recovery UI, not a raw developer dump. It should preserve the shell,
        state what failed, and offer a safe next action.
      </p>
      <div className="recovery-example-pair">
        <article className="recovery-code-card recovery-danger-card">
          <h4>Unsafe fallback</h4>
          <code>error.stack</code>
          <p>Raw stack traces can leak internal paths and confuse users.</p>
        </article>
        <article className="recovery-code-card">
          <h4>Safe fallback</h4>
          <code>role=&quot;alert&quot; + retry action</code>
          <p>Accessible status and a clear reset action preserve trust.</p>
        </article>
      </div>
      <ErrorBoundary
        boundaryName="Fallback UI boundary"
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Restore safe fallback demo"
      >
        <FallbackCrash shouldCrash={shouldCrash} />
      </ErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Show safe fallback
      </button>
    </section>
  )
}
