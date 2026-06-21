import { SellerOrdersList } from './seller-orders-list'
import { SellerOrdersProvider } from './seller-orders-provider'
import { SellerOrdersSummary } from './seller-orders-summary'
import { SellerOrdersToolbar } from './seller-orders-toolbar'
import './seller-orders-async-workspace.css'

function SellerOrdersWorkspaceContent() {
  return (
    <section className="seller-orders-workspace" aria-labelledby="seller-orders-title">
      <header className="seller-orders-header">
        <div>
          <p className="project-eyebrow">Final mini project</p>
          <h2 id="seller-orders-title">Seller Orders Async Workspace</h2>
          <p>
            Change request criteria, observe lifecycle transitions, preserve stale results,
            retry failures, and ignore obsolete requests.
          </p>
        </div>
        <SellerOrdersToolbar />
      </header>

      <div className="seller-orders-layout">
        <SellerOrdersList />
        <SellerOrdersSummary />
      </div>
    </section>
  )
}

export function SellerOrdersAsyncWorkspace() {
  return (
    <SellerOrdersProvider>
      <SellerOrdersWorkspaceContent />
    </SellerOrdersProvider>
  )
}
