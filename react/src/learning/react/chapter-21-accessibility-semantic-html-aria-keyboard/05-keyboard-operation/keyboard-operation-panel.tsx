import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'

export function KeyboardOperationPanel() {
  const panelId = useId()
  const [isOpen, setIsOpen] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="keyboard-operation-title">
      <p className="a11y-card-kicker">9.5</p>
      <h3 id="keyboard-operation-title">Keyboard operation</h3>
      <p>
        Tab reaches focusable elements. Enter and Space activate buttons. Escape should
        close dismissible UI when focus is inside that interaction boundary.
      </p>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        Toggle keyboard notes
      </button>
      {isOpen ? (
        <div className="a11y-disclosure-panel" id={panelId} onKeyDown={handleKeyDown}>
          <p>Keyboard users can close this panel with Escape or move past it with Tab.</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close keyboard notes
          </button>
        </div>
      ) : null}
    </section>
  )
}
