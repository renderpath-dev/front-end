import { HelpDeskDialog } from '../sellerhub-accessibility-interaction-lab/help-desk-dialog'

export function ModalDialogAccessibilityPanel() {
  return (
    <section className="a11y-card" aria-labelledby="modal-dialog-title">
      <p className="a11y-card-kicker">9.11</p>
      <h3 id="modal-dialog-title">Modal dialog accessibility</h3>
      <p>
        A modal dialog needs more than aria-modal. It needs a programmatic name, initial
        focus, tab containment, Escape close, visible close action, and focus return.
      </p>
      <HelpDeskDialog />
    </section>
  )
}
