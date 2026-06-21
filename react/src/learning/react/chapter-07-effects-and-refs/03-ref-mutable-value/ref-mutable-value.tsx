import { useRef, useState } from 'react'

export function RefMutableValue() {
  const interactionCountRef = useRef(0)
  const [visibleSnapshot, setVisibleSnapshot] = useState(0)

  function handleSilentIncrement(): void {
    interactionCountRef.current += 1
  }

  function handleReadSnapshot(): void {
    setVisibleSnapshot(interactionCountRef.current)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Mutable ref value</p>
      <h3>A ref remembers without rendering</h3>
      <div className="button-row">
        <button onClick={handleSilentIncrement}>Increment ref</button>
        <button onClick={handleReadSnapshot}>Read into state</button>
      </div>
      <p>Last rendered ref snapshot: {visibleSnapshot}</p>
    </section>
  )
}
