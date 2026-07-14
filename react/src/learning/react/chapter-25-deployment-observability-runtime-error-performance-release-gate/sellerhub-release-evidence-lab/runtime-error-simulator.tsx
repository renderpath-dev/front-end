import { useState } from 'react'
import { normalizeUnhandledRejection, normalizeWindowErrorEvent } from '../04-runtime-errors/runtime-error-model'
import { chapter25ReleaseId } from './sellerhub-release-evidence-data'

export function RuntimeErrorSimulator() {
  const [message, setMessage] = useState('No simulated runtime diagnostic yet.')

  function simulateWindowError(): void {
    const diagnostic = normalizeWindowErrorEvent({
      correlationId: 'corr-sim-window',
      error: new Error('Catalog route simulation failed'),
      releaseId: chapter25ReleaseId,
      route: '/react/chapter-25',
    })
    setMessage(`${diagnostic.source}: ${diagnostic.message}`)
  }

  function simulateUnhandledRejection(): void {
    const diagnostic = normalizeUnhandledRejection({
      correlationId: 'corr-sim-rejection',
      reason: 'Orders promise rejected without handler',
      releaseId: chapter25ReleaseId,
      route: '/react/chapter-25',
    })
    setMessage(`${diagnostic.source}: ${diagnostic.message}`)
  }

  return (
    <section className="release-evidence-card" aria-labelledby="runtime-simulator-title">
      <h3 id="runtime-simulator-title">Runtime error simulator</h3>
      <p>
        Buttons create local diagnostic objects only. They do not throw real errors and do
        not send telemetry.
      </p>
      <button type="button" onClick={simulateWindowError}>Simulate window error</button>
      <button type="button" onClick={simulateUnhandledRejection}>
        Simulate unhandled rejection
      </button>
      <p role="status">{message}</p>
    </section>
  )
}
