import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { KeyboardEvent } from 'react'

const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  )
}

export function HelpDeskDialog() {
  const titleId = useId()
  const descriptionId = `${titleId}-description`
  const [isOpen, setIsOpen] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  function closeDialog() {
    setIsOpen(false)
    window.setTimeout(() => openerRef.current?.focus(), 0)
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeDialog()
      return
    }

    if (event.key !== 'Tab' || !dialogRef.current) {
      return
    }

    const focusableElements = getFocusableElements(dialogRef.current)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (!firstElement || !lastElement) {
      return
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
      return
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="help-dialog-card-title">
      <h3 id="help-dialog-card-title">Help desk dialog with focus management</h3>
      <p>
        The opener, modal name, initial focus, Escape close, tab containment, and focus
        return are runtime behavior, not ARIA attributes alone.
      </p>
      <button ref={openerRef} type="button" onClick={() => setIsOpen(true)}>
        Open help desk dialog
      </button>
      {isOpen
        ? createPortal(
            <div className="a11y-dialog-backdrop" data-testid="help-dialog-backdrop">
              <div
                aria-describedby={descriptionId}
                aria-labelledby={titleId}
                aria-modal="true"
                className="a11y-dialog"
                onKeyDown={handleDialogKeyDown}
                ref={dialogRef}
                role="dialog"
              >
                <h3 id={titleId}>SellerHub help desk</h3>
                <p id={descriptionId}>
                  Use this modal dialog to request keyboard and accessibility help.
                </p>
                <button ref={closeButtonRef} type="button" onClick={closeDialog}>
                  Close help desk dialog
                </button>
                <button type="button">Send help request</button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
