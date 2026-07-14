import { AbortableCatalogSearchPanel } from './abortable-catalog-search-panel'
import { CacheKeyDedupePanel } from './cache-key-dedupe-panel'
import { CatalogQueryResourcePanel } from './catalog-query-resource-panel'
import { DataFetchingReviewTable } from './data-fetching-review-table'
import { OptimisticNoteMutationPanel } from './optimistic-note-mutation-panel'
import { OrdersRequestLifecyclePanel } from './orders-request-lifecycle-panel'
import { PaginationLoadMoreLab } from './pagination-load-more-lab'
import { RaceConditionDemoPanel } from './race-condition-demo-panel'

export function SellerHubDataFetchingBoundaryLab() {
  return (
    <section className="data-fetching-final-lab" aria-labelledby="sellerhub-lab-title">
      <p className="data-fetching-card__eyebrow">9.19</p>
      <h2 id="sellerhub-lab-title">SellerHub Data Fetching Boundary Lab</h2>
      <p>
        Demo API client boundary: this is a client-side Vite React lab with deterministic
        local Promise behavior. It does not create a backend, database, production cache,
        server authority, SSR, or framework data loading runtime.
      </p>
      <div className="data-fetching-lab-grid">
        <CatalogQueryResourcePanel />
        <OrdersRequestLifecyclePanel />
        <AbortableCatalogSearchPanel />
        <RaceConditionDemoPanel />
        <CacheKeyDedupePanel />
        <PaginationLoadMoreLab />
        <OptimisticNoteMutationPanel />
        <section className="data-fetching-card" aria-labelledby="async-status-region-title">
          <h3 id="async-status-region-title">Async status region</h3>
          <p role="status">
            Async status region keeps loading and refetching updates available to assistive
            technology without using a spinner-only UI.
          </p>
        </section>
        <DataFetchingReviewTable />
      </div>
    </section>
  )
}
