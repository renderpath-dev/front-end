import { useState } from 'react'

type LiveRegionState = 'idle' | 'loading' | 'saved' | 'failed'

export function LiveRegionStatusPanel() {
  const [state, setState] = useState<LiveRegionState>('idle')

  const message =
    state === 'loading'
      ? 'Saving dashboard settings.'
      : state === 'saved'
        ? 'Dashboard settings saved.'
        : state === 'failed'
          ? 'Dashboard settings failed to save.'
          : 'Dashboard settings are idle.'

  return (
    <section className="a11y-card" aria-labelledby="live-region-title">
      <p className="a11y-card-kicker">9.12</p>
      <h3 id="live-region-title">Live regions</h3>
      <p>
        Use polite status messages for normal async progress and assertive alerts only
        for time-sensitive failures.
      </p>
      <div className="a11y-button-row">
        <button type="button" onClick={() => setState('loading')}>
          Start save
        </button>
        <button type="button" onClick={() => setState('saved')}>
          Mark saved
        </button>
        <button type="button" onClick={() => setState('failed')}>
          Mark failed
        </button>
      </div>
      <p aria-busy={state === 'loading'} role={state === 'failed' ? 'alert' : 'status'}>
        {message}
      </p>
    </section>
  )
}
