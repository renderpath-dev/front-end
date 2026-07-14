import { useId, useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'

export function DisclosurePopoverPanel() {
  const panelId = useId()
  const [isOpen, setIsOpen] = useState(false)

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="disclosure-popover-title">
      <p className="a11y-card-kicker">9.10</p>
      <h3 id="disclosure-popover-title">Disclosure and popover-like UI</h3>
      <p>
        The button controls expansion state. Blur and Escape close the panel for keyboard
        users; outside click alone would leave keyboard users blocked.
      </p>
      <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          Toggle shipping filters
        </button>
        {isOpen ? (
          <div className="a11y-disclosure-panel" id={panelId}>
            <button type="button">Fast shipping</button>
            <button type="button">Backordered</button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
