import { useState } from 'react'

export function StateSetterCurrentRender() {
  const [count, setCount] = useState(0)
  const [observation, setObservation] = useState('No update has been queued.')

  function handleIncrement() {
    setCount(count + 1)
    setObservation(`The handler still reads the current render snapshot: ${count}.`)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.6 Setter boundary</p>
      <h2>Setter and current render</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleIncrement} type="button">
        Queue increment
      </button>
      <p className="practice-result" aria-live="polite">
        {observation}
      </p>
    </section>
  )
}
