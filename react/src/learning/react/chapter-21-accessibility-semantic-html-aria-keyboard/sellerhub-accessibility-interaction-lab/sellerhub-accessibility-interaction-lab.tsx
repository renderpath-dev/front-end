import { AccessibilityReviewTable } from './accessibility-review-table'
import { AccessibleFilterForm } from './accessible-filter-form'
import { DashboardStatusRegion } from './dashboard-status-region'
import { HelpDeskDialog } from './help-desk-dialog'
import { KeyboardDisclosureFilter } from './keyboard-disclosure-filter'
import { OrdersTableAccessibility } from './orders-table-accessibility'
import { SettingsErrorSummary } from './settings-error-summary'

export function SellerHubAccessibilityInteractionLab() {
  return (
    <section className="a11y-lab" aria-labelledby="sellerhub-a11y-lab-title">
      <p className="a11y-card-kicker">9.17 final project</p>
      <h2 id="sellerhub-a11y-lab-title">SellerHub Accessibility Interaction Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not fake screen reader output,
        install accessibility libraries, or claim automated tests prove full accessibility.
        Native semantics come first, and ARIA is used only where it has a real semantic job.
      </p>
      <div className="a11y-grid">
        <AccessibleFilterForm />
        <OrdersTableAccessibility />
        <HelpDeskDialog />
        <DashboardStatusRegion />
        <KeyboardDisclosureFilter />
        <SettingsErrorSummary />
        <AccessibilityReviewTable />
      </div>
    </section>
  )
}
