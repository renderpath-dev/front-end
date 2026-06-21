import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function ControlledUncontrolledBoundary() {
  const [controlledValue, setControlledValue] = useState('React owns this value')

  function handleControlledChange(event: ChangeEvent<HTMLInputElement>): void {
    setControlledValue(event.currentTarget.value)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Ownership boundary</p>
      <h3>Controlled and uncontrolled inputs</h3>
      <div className="stacked-fields">
        <label>
          Controlled input
          <input onChange={handleControlledChange} value={controlledValue} />
        </label>
        <label>
          Uncontrolled input
          <input defaultValue="The browser owns later edits" />
        </label>
      </div>
      <p>Only the first value is available in this component render: {controlledValue}</p>
    </section>
  )
}
