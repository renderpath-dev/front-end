import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'

export function KeyboardDisclosureFilter() {
  const panelId = useId()
  const [isOpen, setIsOpen] = useState(false)

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="disclosure-filter-title">
      <h3 id="disclosure-filter-title">Keyboard disclosure filter</h3>
      <p>
        The native button owns Enter and Space activation. Escape closes the expanded
        panel when focus is inside the disclosure content.
      </p>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        Toggle advanced filters
      </button>
      {isOpen ? (
        <div className="a11y-disclosure-panel" id={panelId} onKeyDown={handlePanelKeyDown}>
          <label>
            Minimum rating
            <select defaultValue="4">
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </label>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close advanced filters
          </button>
        </div>
      ) : null}
    </section>
  )
}
