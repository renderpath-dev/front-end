import { useState } from 'react'

export function StateSnapshot() {
  const [count, setCount] = useState(0)
  const [snapshotMessage, setSnapshotMessage] = useState('Schedule a snapshot, then increment.')

  function handleScheduleSnapshot() {
    const scheduledCount = count

    window.setTimeout(() => {
      setSnapshotMessage(`The scheduled handler captured count ${scheduledCount}.`)
    }, 1000)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.7 Snapshot and closure</p>
      <h2>State as a snapshot</h2>
      <p className="practice-metric">{count}</p>
      <div className="practice-actions">
        <button className="practice-button secondary" onClick={handleScheduleSnapshot} type="button">
          Schedule snapshot
        </button>
        <button
          className="practice-button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
          type="button"
        >
          Increment now
        </button>
      </div>
      <p className="practice-result" aria-live="polite">
        {snapshotMessage}
      </p>
    </section>
  )
}
