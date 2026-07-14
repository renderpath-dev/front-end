import { useState } from 'react'

type DashboardStatus = 'idle' | 'loading' | 'updated' | 'failed'

export function DashboardStatusRegion() {
  const [status, setStatus] = useState<DashboardStatus>('idle')

  const statusMessage =
    status === 'loading'
      ? 'Dashboard metrics are loading.'
      : status === 'updated'
        ? 'Dashboard metrics updated.'
        : status === 'failed'
          ? 'Dashboard metrics failed to update.'
          : 'Dashboard metrics are idle.'

  return (
    <section className="a11y-card" aria-labelledby="dashboard-status-title">
      <h3 id="dashboard-status-title">Dashboard status live region</h3>
      <p>
        Meaningful async state changes update a status or alert region. The lab does not
        fake screen reader output.
      </p>
      <div className="a11y-button-row">
        <button type="button" onClick={() => setStatus('loading')}>
          Set loading status
        </button>
        <button type="button" onClick={() => setStatus('updated')}>
          Set success status
        </button>
        <button type="button" onClick={() => setStatus('failed')}>
          Set error alert
        </button>
      </div>
      <p
        aria-live={status === 'failed' ? 'assertive' : 'polite'}
        role={status === 'failed' ? 'alert' : 'status'}
      >
        {statusMessage}
      </p>
    </section>
  )
}
