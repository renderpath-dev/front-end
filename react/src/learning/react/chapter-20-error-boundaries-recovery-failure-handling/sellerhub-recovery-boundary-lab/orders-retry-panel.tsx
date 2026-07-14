import { useState } from 'react'

type OrdersStatus = 'ready' | 'failed' | 'recovered'

export function OrdersRetryPanel() {
  const [status, setStatus] = useState<OrdersStatus>('ready')

  return (
    <section className="recovery-card" aria-labelledby="orders-retry-title">
      <h3 id="orders-retry-title">Orders retry panel</h3>
      <p>
        Request failures are owned by the async request state. The panel shows recovery UI
        without claiming that an Error Boundary caught the event or Promise rejection.
      </p>
      {status === 'failed' ? (
        <div className="recovery-boundary-fallback" role="alert">
          <p className="recovery-card-kicker">Orders request</p>
          <h4>Orders request failed.</h4>
          <p>The request owner can retry after clearing the failed request state.</p>
          <button type="button" onClick={() => setStatus('recovered')}>
            Retry orders request
          </button>
        </div>
      ) : (
        <p className="recovery-success-note">
          {status === 'recovered' ? 'Orders recovered after retry.' : 'Orders panel ready.'}
        </p>
      )}
      <button type="button" onClick={() => setStatus('failed')}>
        Simulate orders failure
      </button>
    </section>
  )
}
