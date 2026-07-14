import { useState } from 'react'
import { createPortal } from 'react-dom'

export function PortalModalBoundary() {
  const [isOpen, setIsOpen] = useState(false)
  const [ownerClicks, setOwnerClicks] = useState(0)

  return (
    <article className="dom-boundary-card" onClick={() => setOwnerClicks((count) => count + 1)}>
      <p className="dom-boundary-kicker">9.2 createPortal</p>
      <h3>DOM placement changes, React ownership stays</h3>
      <p>
        The modal is placed in document.body, but the click still belongs to this React owner
        subtree unless the event is stopped.
      </p>
      <button className="dom-boundary-button" onClick={() => setIsOpen(true)} type="button">
        Open portal modal
      </button>
      <p className="dom-boundary-muted">React tree click count: {ownerClicks}</p>
      {isOpen
        ? createPortal(
            <div className="dom-boundary-backdrop">
              <div aria-modal="true" className="dom-boundary-dialog" role="dialog">
                <h4>Portal modal boundary</h4>
                <p>This dialog is physically outside the card but still rendered by it.</p>
                <button
                  className="dom-boundary-button"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Close portal modal
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  )
}
