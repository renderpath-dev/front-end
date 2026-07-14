import './chapter-20-practice.css'
import { FailureBoundaryPanel } from './01-failure-boundary/failure-boundary-panel'
import { ErrorBoundaryClassPanel } from './02-error-boundary-class/error-boundary-class-panel'
import { RenderErrorPropagationPanel } from './03-render-error-propagation/render-error-propagation-panel'
import { NotCaughtBoundariesPanel } from './04-not-caught-boundaries/not-caught-boundaries-panel'
import { RecoveryFallbackPanel } from './05-fallback-ui/recovery-fallback-panel'
import { ResetRetryBoundaryPanel } from './06-reset-retry/reset-retry-boundary-panel'
import { SuspenseVsErrorBoundaryPanel } from './07-suspense-vs-error/suspense-vs-error-boundary-panel'
import { LazyImportFailurePanel } from './08-lazy-import-failure/lazy-import-failure-panel'
import { RouteLevelBoundaryPanel } from './09-route-level-boundary/route-level-boundary-panel'
import { WidgetLevelBoundaryPanel } from './10-widget-level-boundary/widget-level-boundary-panel'
import { ErrorLoggingBoundaryPanel } from './11-logging-boundary/error-logging-boundary-panel'
import { TestingFailureUiPanel } from './12-testing-failure-ui/testing-failure-ui-panel'
import { SellerHubFailureMap } from './13-sellerhub-failure-map/sellerhub-failure-map'
import { SellerHubRecoveryBoundaryLab } from './sellerhub-recovery-boundary-lab/sellerhub-recovery-boundary-lab'

export function Chapter20PracticeRoot() {
  return (
    <main className="chapter-twenty-shell">
      <header className="chapter-twenty-hero">
        <p className="chapter-twenty-eyebrow">React Chapter 20</p>
        <h1>Error Boundaries, Recovery UI, and Failure Handling</h1>
        <p>
          Practice render failure isolation, fallback design, reset and retry behavior,
          Suspense composition, lazy import failures, logging boundaries, and SellerHub
          recovery decisions in a client-side Vite React lab.
        </p>
        <div className="recovery-pill-row" aria-label="Chapter 20 coverage">
          <span className="recovery-pill">Render failures</span>
          <span className="recovery-pill recovery-pill-success">Runnable client lab</span>
          <span className="recovery-pill recovery-pill-warning">Event and async boundaries</span>
        </div>
      </header>

      <div className="chapter-twenty-layout">
        <section className="chapter-twenty-section" aria-labelledby="chapter-20-core">
          <h2 id="chapter-20-core">Error boundary mechanisms</h2>
          <div className="chapter-twenty-grid">
            <FailureBoundaryPanel />
            <ErrorBoundaryClassPanel />
            <RenderErrorPropagationPanel />
            <NotCaughtBoundariesPanel />
            <RecoveryFallbackPanel />
            <ResetRetryBoundaryPanel />
          </div>
        </section>

        <section className="chapter-twenty-section" aria-labelledby="chapter-20-boundaries">
          <h2 id="chapter-20-boundaries">Recovery composition and architecture</h2>
          <div className="chapter-twenty-grid">
            <SuspenseVsErrorBoundaryPanel />
            <LazyImportFailurePanel />
            <RouteLevelBoundaryPanel />
            <WidgetLevelBoundaryPanel />
            <ErrorLoggingBoundaryPanel />
            <TestingFailureUiPanel />
            <SellerHubFailureMap />
          </div>
        </section>

        <SellerHubRecoveryBoundaryLab />
      </div>
    </main>
  )
}
