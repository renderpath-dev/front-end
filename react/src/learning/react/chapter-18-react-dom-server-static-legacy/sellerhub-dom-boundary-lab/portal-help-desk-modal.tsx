import { useState } from 'react'
import { createPortal } from 'react-dom'

export function PortalHelpDeskModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="dom-boundary-card" aria-labelledby="portal-help-desk-title">
      <p className="dom-boundary-kicker">Final lab</p>
      <h3 id="portal-help-desk-title">Portal help desk modal</h3>
      <p>
        The dialog renders into document.body while the owning component still controls the
        open state and close action.
      </p>
      <button
        className="dom-boundary-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Open SellerHub help desk
      </button>

      {isOpen
        ? createPortal(
            <div className="dom-boundary-backdrop">
              <div
                aria-labelledby="sellerhub-help-desk-title"
                aria-modal="true"
                className="dom-boundary-dialog"
                role="dialog"
              >
                <h4 id="sellerhub-help-desk-title">SellerHub help desk</h4>
                <p>
                  Portal target: document.body. React owner: the SellerHub DOM Boundary Lab.
                </p>
                <button
                  className="dom-boundary-button"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Close help desk
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
