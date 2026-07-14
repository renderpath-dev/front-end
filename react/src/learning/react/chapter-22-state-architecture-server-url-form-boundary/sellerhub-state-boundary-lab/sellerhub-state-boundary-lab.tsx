import { CatalogFilterCodecPanel } from './catalog-filter-codec-panel'
import { CatalogFilterUrlState } from './catalog-filter-url-state'
import { DashboardSelectionStatePanel } from './dashboard-selection-state-panel'
import { OptimisticOrderNotePanel } from './optimistic-order-note-panel'
import { OrdersRequestStatePanel } from './orders-request-state-panel'
import { SettingsFormStatePanel } from './settings-form-state-panel'
import { StateArchitectureReviewCard } from './state-architecture-review-card'
import { StateOwnerDecisionTable } from './state-owner-decision-table'

export function SellerHubStateBoundaryLab() {
  return (
    <section className="state-lab" aria-labelledby="sellerhub-state-lab-title">
      <p className="state-card-kicker">9.18 final project</p>
      <h2 id="sellerhub-state-lab-title">SellerHub State Boundary Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not create a real backend, install
        server-state, form, or global state libraries, claim useState owns remote server data,
        store secrets or large objects in the URL, or use localStorage as a universal state
        solution.
      </p>
      <p>
        The lab treats URL state, server state, form draft state, and local UI state as separate
        ownership boundaries.
      </p>
      <div className="state-lab-grid">
        <CatalogFilterUrlState />
        <CatalogFilterCodecPanel />
        <OrdersRequestStatePanel />
        <SettingsFormStatePanel />
        <DashboardSelectionStatePanel />
        <OptimisticOrderNotePanel />
        <StateOwnerDecisionTable />
        <StateArchitectureReviewCard />
      </div>
    </section>
  )
}
