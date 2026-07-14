import { DataFetchingBoundaryPanel } from './01-fetch-boundary/data-fetching-boundary-panel'
import { FetchApiResponseBoundaryPanel } from './02-fetch-api/fetch-api-response-boundary-panel'
import { ResponseParsingBoundaryPanel } from './03-response-parsing/response-parsing-boundary-panel'
import { RequestLifecyclePanel } from './04-request-lifecycle/request-lifecycle-panel'
import { EffectCleanupFetchPanel } from './05-effect-cleanup/effect-cleanup-fetch-panel'
import { RaceConditionStaleResponsePanel } from './06-race-conditions/race-condition-stale-response-panel'
import { AbortControllerPanel } from './07-abort-controller/abort-controller-panel'
import { TimeoutCancellationPanel } from './08-timeout-cancellation/timeout-cancellation-panel'
import { CustomDataHookPanel } from './09-custom-hook/custom-data-hook-panel'
import { QueryDrivenRequestPanel } from './10-query-driven-requests/query-driven-request-panel'
import { CacheBoundaryPanel } from './11-cache-boundary/cache-boundary-panel'
import { InvalidationBoundaryPanel } from './12-invalidation-boundary/invalidation-boundary-panel'
import { PaginationLoadMorePanel } from './13-pagination-load-more/pagination-load-more-panel'
import { OptimisticRollbackPanel } from './14-optimistic-rollback/optimistic-rollback-panel'
import { AsyncUiStatePanel } from './15-async-ui-states/async-ui-state-panel'
import { SuspenseFrameworkDataBoundaryPanel } from './16-suspense-framework-boundary/suspense-framework-data-boundary-panel'
import { TestingAsyncDataPanel } from './17-testing-async-data/testing-async-data-panel'
import { SellerHubDataFetchingMap } from './18-sellerhub-data-map/sellerhub-data-fetching-map'
import { SellerHubDataFetchingBoundaryLab } from './sellerhub-data-fetching-boundary-lab/sellerhub-data-fetching-boundary-lab'
import './chapter-24-practice.css'

export function Chapter24PracticeRoot() {
  return (
    <main className="data-fetching-lab-page">
      <section className="data-fetching-hero" aria-labelledby="chapter-24-title">
        <p className="data-fetching-card__eyebrow">React Chapter 24</p>
        <h1 id="chapter-24-title">
          Data Fetching, Cancellation, Race Condition, and Cache Boundary
        </h1>
        <p>
          Practice client-side request lifecycle modeling, cancellation, stale response
          guards, response parsing, cache identity, pagination, optimistic rollback, and
          honest framework data-fetching boundaries.
        </p>
        <div className="data-fetching-pill-row" aria-label="Chapter 24 boundaries">
          <span>Client-side Vite lab</span>
          <span>Deterministic demo API</span>
          <span>No production cache</span>
          <span>No backend authority</span>
        </div>
      </section>

      <div className="data-fetching-grid">
        <DataFetchingBoundaryPanel />
        <FetchApiResponseBoundaryPanel />
        <ResponseParsingBoundaryPanel />
        <RequestLifecyclePanel />
        <EffectCleanupFetchPanel />
        <RaceConditionStaleResponsePanel />
        <AbortControllerPanel />
        <TimeoutCancellationPanel />
        <CustomDataHookPanel />
        <QueryDrivenRequestPanel />
        <CacheBoundaryPanel />
        <InvalidationBoundaryPanel />
        <PaginationLoadMorePanel />
        <OptimisticRollbackPanel />
        <AsyncUiStatePanel />
        <SuspenseFrameworkDataBoundaryPanel />
        <TestingAsyncDataPanel />
        <SellerHubDataFetchingMap />
      </div>

      <SellerHubDataFetchingBoundaryLab />
    </main>
  )
}
