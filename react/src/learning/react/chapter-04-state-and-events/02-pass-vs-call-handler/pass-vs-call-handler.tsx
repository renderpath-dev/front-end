import { useState } from 'react'

export function PassVsCallHandler() {
  const [message, setMessage] = useState('The handler has not run.')

  function handleClick() {
    setMessage('React called the handler after the click.')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.2 Function value</p>
      <h2>Pass versus call</h2>
      <p className="code-comparison">onClick={'{handleClick}'}</p>
      <button className="practice-button" onClick={handleClick} type="button">
        Pass the handler
      </button>
      <p className="practice-result" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
