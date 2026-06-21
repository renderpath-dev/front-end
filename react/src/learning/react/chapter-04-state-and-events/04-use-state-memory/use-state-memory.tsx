import { useState } from 'react'

export function UseStateMemory() {
  const [count, setCount] = useState(0)

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.4 Component memory</p>
      <h2>useState memory</h2>
      <p className="practice-metric">{count}</p>
      <button
        className="practice-button"
        onClick={() => setCount(count + 1)}
        type="button"
      >
        Increment
      </button>
      <p className="practice-note">The value survives the next component render.</p>
    </section>
  )
}
