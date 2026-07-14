import { useState } from 'react'

export function DisabledStateBoundaryPanel() {
  const [guardedCount, setGuardedCount] = useState(0)
  const isUnavailable = true

  function handleGuardedAction() {
    if (isUnavailable) {
      return
    }

    setGuardedCount((currentCount) => currentCount + 1)
  }

  return (
    <section className="a11y-card" aria-labelledby="disabled-state-title">
      <p className="a11y-card-kicker">9.9</p>
      <h3 id="disabled-state-title">disabled vs aria-disabled</h3>
      <p>
        Native disabled controls block interaction. aria-disabled communicates disabled
        state but does not block events, so the owner needs an event guard.
      </p>
      <button type="button" disabled>
        Native disabled save
      </button>
      <button aria-disabled={isUnavailable} type="button" onClick={handleGuardedAction}>
        Guarded aria-disabled action
      </button>
      <p role="status">Guarded action count: {guardedCount}</p>
    </section>
  )
}
