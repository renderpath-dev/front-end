import { useState } from 'react'

export function FunctionalUpdate() {
  const [count, setCount] = useState(0)

  function handleIncrementThreeTimes() {
    setCount((previousCount) => previousCount + 1)
    setCount((previousCount) => previousCount + 1)
    setCount((previousCount) => previousCount + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.9 Queued previous state</p>
      <h2>Functional update</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleIncrementThreeTimes} type="button">
        Increment by three
      </button>
      <p className="practice-note">Each updater receives the queued previous value.</p>
    </section>
  )
}
