import { TransitionFilterWorkspace } from '../03-transition-boundary/transition-filter-workspace'
import { CssInsertionBoundaryPanel } from '../09-insertion-effect/css-insertion-boundary-panel'
import { AccessibleFilterForm } from './accessible-filter-form'
import { ApiGapDecisionTable } from './api-gap-decision-table'
import { DeferredProductSearch } from './deferred-product-search'
import { EffectEventAuditPanel } from './effect-event-audit-panel'
import { ImperativeCommandPanel } from './imperative-command-panel'
import { InventoryStoreView } from './inventory-store-view'
import { LayoutMeasuredPanel } from './layout-measured-panel'

export function SellerHubApiGapLab() {
  return (
    <section className="sellerhub-gap-lab" aria-labelledby="sellerhub-api-gap-lab-title">
      <div>
        <p className="chapter-seventeen-eyebrow">Final mini project</p>
        <h2 id="sellerhub-api-gap-lab-title">SellerHub API Gap Lab</h2>
        <p>
          Combine official API gap exercises into a small SellerHub workspace without
          converting server-only or diagnostic APIs into client business features.
        </p>
      </div>
      <div className="sellerhub-gap-grid">
        <DeferredProductSearch />
        <TransitionFilterWorkspace />
        <InventoryStoreView />
        <AccessibleFilterForm />
        <LayoutMeasuredPanel />
        <CssInsertionBoundaryPanel />
        <ImperativeCommandPanel />
        <EffectEventAuditPanel />
      </div>
      <ApiGapDecisionTable />
    </section>
  )
}
