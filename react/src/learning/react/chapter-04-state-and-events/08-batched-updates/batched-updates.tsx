import { useState } from 'react'

export function BatchedUpdates() {
  const [count, setCount] = useState(0)

  function handleReplacementUpdates() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.8 Update queue</p>
      <h2>Batched replacement updates</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleReplacementUpdates} type="button">
        Queue count + 1 three times
      </button>
      <p className="practice-note">All three expressions read the same render snapshot.</p>
    </section>
  )
}
