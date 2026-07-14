import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

const initialNotes = ['Review catalog order', 'Check support escalation']

export function FlushSyncMeasurementPanel() {
  const [notes, setNotes] = useState(initialNotes)
  const [measurement, setMeasurement] = useState('No forced measurement yet.')
  const listRef = useRef<HTMLUListElement>(null)

  function addEscalationAndMeasure(): void {
    flushSync(() => {
      setNotes((currentNotes) => [
        ...currentNotes,
        `Escalation note ${currentNotes.length + 1}`,
      ])
    })

    const height = listRef.current?.getBoundingClientRect().height ?? 0
    setMeasurement(`Measured list height after forced commit: ${Math.round(height)}px`)
  }

  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.3 flushSync</p>
      <h3>Emergency synchronous DOM flush</h3>
      <p>
        This panel uses flushSync only to demonstrate a post-update measurement boundary.
        Normal state updates should stay batched.
      </p>
      <button className="dom-boundary-button" onClick={addEscalationAndMeasure} type="button">
        Add escalation and measure
      </button>
      <ul className="dom-boundary-list" ref={listRef}>
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <p className="dom-boundary-warning">{measurement}</p>
    </article>
  )
}
