import './chapter-21-practice.css'
import { AccessibilityTreeBoundaryPanel } from './01-accessibility-boundary/accessibility-tree-boundary-panel'
import { SemanticHtmlFirstPanel } from './02-semantic-html/semantic-html-first-panel'
import { AccessibleNameDescriptionPanel } from './03-accessible-name-description/accessible-name-description-panel'
import { FormErrorValidationPanel } from './04-form-errors/form-error-validation-panel'
import { KeyboardOperationPanel } from './05-keyboard-operation/keyboard-operation-panel'
import { FocusManagementPanel } from './06-focus-management/focus-management-panel'
import { SkipLinksLandmarksPanel } from './07-skip-links-landmarks/skip-links-landmarks-panel'
import { ButtonLinkRolePanel } from './08-button-link-role/button-link-role-panel'
import { DisabledStateBoundaryPanel } from './09-disabled-aria-disabled/disabled-state-boundary-panel'
import { DisclosurePopoverPanel } from './10-disclosure-popover/disclosure-popover-panel'
import { ModalDialogAccessibilityPanel } from './11-modal-dialog/modal-dialog-accessibility-panel'
import { LiveRegionStatusPanel } from './12-live-regions/live-region-status-panel'
import { TableListSemanticsPanel } from './13-table-list-semantics/table-list-semantics-panel'
import { RovingTabindexPanel } from './14-roving-tabindex/roving-tabindex-panel'
import { TestingAccessibilityPanel } from './15-testing-accessibility/testing-accessibility-panel'
import { SellerHubAccessibilityMap } from './16-sellerhub-accessibility-map/sellerhub-accessibility-map'
import { SellerHubAccessibilityInteractionLab } from './sellerhub-accessibility-interaction-lab/sellerhub-accessibility-interaction-lab'

export function Chapter21PracticeRoot() {
  return (
    <main className="chapter-twenty-one-shell">
      <header className="chapter-twenty-one-hero">
        <p className="chapter-twenty-one-eyebrow">React Chapter 21</p>
        <h1>Accessibility, Semantic HTML, ARIA, and Keyboard Interaction</h1>
        <p>
          Practice accessibility as concrete React engineering: semantic DOM output,
          accessible names, labels, error relationships, keyboard behavior, focus repair,
          landmarks, live regions, dialogs, composite widgets, and role-based tests.
        </p>
        <div className="a11y-pill-row" aria-label="Chapter 21 coverage">
          <span className="a11y-pill">Semantic HTML first</span>
          <span className="a11y-pill a11y-pill-success">Runnable client lab</span>
          <span className="a11y-pill a11y-pill-warning">Manual testing boundary</span>
        </div>
      </header>

      <div className="chapter-twenty-one-layout">
        <section className="chapter-twenty-one-section" aria-labelledby="chapter-21-core">
          <h2 id="chapter-21-core">Accessibility mechanisms</h2>
          <div className="chapter-twenty-one-grid">
            <AccessibilityTreeBoundaryPanel />
            <SemanticHtmlFirstPanel />
            <AccessibleNameDescriptionPanel />
            <FormErrorValidationPanel />
            <KeyboardOperationPanel />
            <FocusManagementPanel />
            <SkipLinksLandmarksPanel />
            <ButtonLinkRolePanel />
          </div>
        </section>

        <section className="chapter-twenty-one-section" aria-labelledby="chapter-21-widgets">
          <h2 id="chapter-21-widgets">Interaction boundaries and review evidence</h2>
          <div className="chapter-twenty-one-grid">
            <DisabledStateBoundaryPanel />
            <DisclosurePopoverPanel />
            <ModalDialogAccessibilityPanel />
            <LiveRegionStatusPanel />
            <TableListSemanticsPanel />
            <RovingTabindexPanel />
            <TestingAccessibilityPanel />
            <SellerHubAccessibilityMap />
          </div>
        </section>

        <SellerHubAccessibilityInteractionLab />
      </div>
    </main>
  )
}
