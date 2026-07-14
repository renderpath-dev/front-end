import { useState } from 'react'

type AsyncStatus = 'idle' | 'failed' | 'recovered'

export function NotCaughtBoundariesPanel() {
  const [eventMessage, setEventMessage] = useState('No event error handled yet.')
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')

  function handleEventError() {
    try {
      throw new Error('Event handler validation failed.')
    } catch (error) {
      setEventMessage(error instanceof Error ? error.message : String(error))
    }
  }

  function simulateAsyncFailure() {
    Promise.resolve().then(() => {
      setAsyncStatus('failed')
    })
  }

  return (
    <section className="recovery-card" aria-labelledby="not-caught-boundaries-title">
      <p className="recovery-card-kicker">9.4</p>
      <h3 id="not-caught-boundaries-title">What Error Boundaries do not catch</h3>
      <p>
        Event handlers and async callbacks have their own owner. Handle them in event or
        request state instead of claiming an Error Boundary caught them.
      </p>
      <div className="recovery-example-pair">
        <article className="recovery-widget-card">
          <h4>Event owner</h4>
          <p>{eventMessage}</p>
          <button type="button" onClick={handleEventError}>
            Handle event error locally
          </button>
        </article>
        <article className="recovery-widget-card">
          <h4>Async owner</h4>
          <p>
            {asyncStatus === 'failed'
              ? 'Async request state owns this recovery UI.'
              : 'Async request state is idle.'}
          </p>
          <button type="button" onClick={simulateAsyncFailure}>
            Simulate async failure state
          </button>
          <button type="button" onClick={() => setAsyncStatus('recovered')}>
            Recover async state
          </button>
        </article>
      </div>
    </section>
  )
}
