import { useState } from 'react'

export function LocalVariableVsState() {
  const localCount = 0
  const [stateCount, setStateCount] = useState(0)

  function handleClick() {
    console.log(`Calculated local value: ${localCount + 1}`)
    setStateCount((currentCount) => currentCount + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.5 Render-local binding</p>
      <h2>Local variable versus state</h2>
      <dl className="value-pair">
        <div>
          <dt>Local variable after render</dt>
          <dd>{localCount}</dd>
        </div>
        <div>
          <dt>State value</dt>
          <dd>{stateCount}</dd>
        </div>
      </dl>
      <button className="practice-button" onClick={handleClick} type="button">
        Update both
      </button>
    </section>
  )
}
