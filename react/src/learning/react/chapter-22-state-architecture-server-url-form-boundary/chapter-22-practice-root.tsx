import './chapter-22-practice.css'
import { StateOwnerBoundaryPanel } from './01-state-owner-boundary/state-owner-boundary-panel'
import { LocalDerivedStatePanel } from './02-local-derived-state/local-derived-state-panel'
import { NormalizedEntityStatePanel } from './03-normalized-state/normalized-entity-state-panel'
import { FormDraftStatePanel } from './04-form-draft-state/form-draft-state-panel'
import { LiftedStateOwnerPanel } from './05-lifted-state/lifted-state-owner-panel'
import { StateColocationPanel } from './06-colocation-overlifting/state-colocation-panel'
import { ReducerTransitionPanel } from './07-reducer-transitions/reducer-transition-panel'
import { ContextProviderBoundaryPanel } from './08-context-boundary/context-provider-boundary-panel'
import { ReducerContextBoundaryPanel } from './09-reducer-context/reducer-context-boundary-panel'
import { UrlSearchStatePanel } from './10-url-state/url-search-state-panel'
import { UrlSearchParamsParsingPanel } from './11-url-search-params/url-search-params-parsing-panel'
import { ServerStateBoundaryPanel } from './12-server-state-boundary/server-state-boundary-panel'
import { RequestStatusModelPanel } from './13-request-status/request-status-model-panel'
import { OptimisticRollbackPanel } from './14-optimistic-state/optimistic-rollback-panel'
import { PreserveResetStatePanel } from './15-preserve-reset-state/preserve-reset-state-panel'
import { StateOwnerComparisonPanel } from './16-external-url-react-state/state-owner-comparison-panel'
import { SellerHubStateArchitectureMap } from './17-sellerhub-state-map/sellerhub-state-architecture-map'
import { SellerHubStateBoundaryLab } from './sellerhub-state-boundary-lab/sellerhub-state-boundary-lab'

export function Chapter22PracticeRoot() {
  return (
    <main className="chapter-twenty-two-shell">
      <header className="chapter-twenty-two-hero">
        <p className="chapter-twenty-two-eyebrow">React Chapter 22</p>
        <h1>State Architecture, Server State, URL State, and Form State Boundary</h1>
        <p>
          Practice state architecture as an ownership and synchronization problem. The exercises
          separate local UI state, derived values, normalized entities, reducer transitions, context
          scope, URL state, request lifecycle state, optimistic state, and external store boundaries.
        </p>
        <div className="state-pill-row" aria-label="Chapter 22 coverage">
          <span className="state-pill">Owner first</span>
          <span className="state-pill state-pill-success">Runnable client lab</span>
          <span className="state-pill state-pill-warning">Server cache boundary only</span>
        </div>
      </header>

      <div className="chapter-twenty-two-layout">
        <section className="chapter-twenty-two-section" aria-labelledby="chapter-22-core">
          <h2 id="chapter-22-core">State ownership mechanisms</h2>
          <div className="chapter-twenty-two-grid">
            <StateOwnerBoundaryPanel />
            <LocalDerivedStatePanel />
            <NormalizedEntityStatePanel />
            <FormDraftStatePanel />
            <LiftedStateOwnerPanel />
            <StateColocationPanel />
            <ReducerTransitionPanel />
            <ContextProviderBoundaryPanel />
          </div>
        </section>

        <section className="chapter-twenty-two-section" aria-labelledby="chapter-22-boundaries">
          <h2 id="chapter-22-boundaries">Synchronization and boundary mechanisms</h2>
          <div className="chapter-twenty-two-grid">
            <ReducerContextBoundaryPanel />
            <UrlSearchStatePanel />
            <UrlSearchParamsParsingPanel />
            <ServerStateBoundaryPanel />
            <RequestStatusModelPanel />
            <OptimisticRollbackPanel />
            <PreserveResetStatePanel />
            <StateOwnerComparisonPanel />
            <SellerHubStateArchitectureMap />
          </div>
        </section>

        <SellerHubStateBoundaryLab />
      </div>
    </main>
  )
}
