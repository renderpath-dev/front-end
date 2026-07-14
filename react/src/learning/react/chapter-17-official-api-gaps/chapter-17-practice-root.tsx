import './chapter-17-practice.css'
import { ApiGapBoundaryPanel } from './01-api-gap-boundary/api-gap-boundary-panel'
import { DeferredCatalogSearch } from './02-deferred-value/deferred-catalog-search'
import { TransitionFilterWorkspace } from './03-transition-boundary/transition-filter-workspace'
import { DeferredVsTransitionPanel } from './04-deferred-vs-transition/deferred-vs-transition-panel'
import { SyncExternalStorePanel } from './05-sync-external-store/sync-external-store-panel'
import { AccessibilityIdPanel } from './06-use-id/accessibility-id-panel'
import { UseDebugValuePanel } from './07-use-debug-value/use-debug-value-panel'
import { LayoutMeasurementPanel } from './08-layout-effect/layout-measurement-panel'
import { CssInsertionBoundaryPanel } from './09-insertion-effect/css-insertion-boundary-panel'
import { ImperativeSearchPanel } from './10-imperative-handle/imperative-search-panel'
import { EffectEventLatestValuePanel } from './11-effect-event/effect-event-latest-value-panel'
import { FrameworkDiagnosticBoundaryPanel } from './12-framework-diagnostic-boundary/framework-diagnostic-boundary-panel'
import { SellerHubApiGapMap } from './13-sellerhub-api-gap-map/sellerhub-api-gap-map'
import { SellerHubApiGapLab } from './sellerhub-api-gap-lab/sellerhub-api-gap-lab'

export function Chapter17PracticeRoot() {
  return (
    <main className="chapter-seventeen-shell">
      <header className="chapter-seventeen-hero">
        <p className="chapter-seventeen-eyebrow">React Chapter 17</p>
        <h1>Official API Gaps, Escape Hatches, and External Store Boundary</h1>
        <p>
          Fill the remaining official React API gaps with small runnable exercises and
          mark framework, server, and diagnostic boundaries honestly.
        </p>
        <div className="api-gap-pill-row" aria-label="Chapter API coverage">
          <span className="api-gap-pill api-gap-pill-success">Runnable client hooks</span>
          <span className="api-gap-pill">External store contract</span>
          <span className="api-gap-pill api-gap-pill-warning">Server and diagnostic APIs</span>
        </div>
      </header>

      <div className="chapter-seventeen-layout">
        <section className="chapter-seventeen-section" aria-labelledby="chapter-17-map">
          <h2 id="chapter-17-map">API boundary map</h2>
          <ApiGapBoundaryPanel />
          <FrameworkDiagnosticBoundaryPanel />
        </section>

        <section className="chapter-seventeen-section" aria-labelledby="chapter-17-client">
          <h2 id="chapter-17-client">Runnable client API practice</h2>
          <div className="chapter-seventeen-grid">
            <DeferredCatalogSearch />
            <TransitionFilterWorkspace />
            <DeferredVsTransitionPanel />
            <SyncExternalStorePanel />
            <AccessibilityIdPanel />
            <UseDebugValuePanel />
            <LayoutMeasurementPanel />
            <CssInsertionBoundaryPanel />
            <ImperativeSearchPanel />
            <EffectEventLatestValuePanel />
          </div>
        </section>

        <section className="chapter-seventeen-section" aria-labelledby="chapter-17-sellerhub">
          <h2 id="chapter-17-sellerhub">SellerHub mapping</h2>
          <SellerHubApiGapMap />
        </section>

        <SellerHubApiGapLab />
      </div>
    </main>
  )
}
