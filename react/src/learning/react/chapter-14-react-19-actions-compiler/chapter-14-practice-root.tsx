import { ActionTransitionResult } from './01-action-boundary/action-transition-result'
import { SequentialActionQueue } from './02-use-action-state-queue/sequential-action-queue'
import { ActionReducerBoundary } from './03-action-state-vs-reducer/action-reducer-boundary'
import { FormActionProgressiveBoundary } from './04-form-action-progressive-model/form-action-progressive-boundary'
import { FormStatusSubmitButton } from './05-use-form-status-submit-button/form-status-submit-button'
import { OptimisticReviewReconciliation } from './06-use-optimistic-rollback/optimistic-review-reconciliation'
import { UseApiResourceBoundary } from './07-use-api-suspense-promise/use-api-resource-boundary'
import { ServerFunctionBoundaryMap } from './08-server-functions-boundary/server-function-boundary-map'
import { React19PlatformBoundaries } from './09-ref-metadata-static-apis/react-19-platform-boundaries'
import { CompilerOptimizationModel } from './10-react-compiler-goal/compiler-optimization-model'
import { CompilerRuleEvidencePanel } from './11-compiler-rules-lints/compiler-rule-evidence'
import { React19MigrationGates } from './12-migration-strategy/react-19-migration-gates'
import { SellerHubReact19BoundaryMap } from './13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map'
import { SellerHubReact19ActionsLab } from './sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab'
import './chapter-14-practice.css'

export function Chapter14PracticeRoot() {
  return (
    <main className="chapter14-shell">
      <header className="chapter14-hero">
        <p className="chapter14-kicker">React Chapter 14</p>
        <h1>React 19 Actions, use API, and React Compiler</h1>
        <p>
          A React 19 mechanism lab that separates runnable client APIs from framework and
          build-time boundaries.
        </p>
      </header>

      <ActionTransitionResult />
      <SequentialActionQueue />
      <ActionReducerBoundary />
      <FormActionProgressiveBoundary />
      <FormStatusSubmitButton />
      <OptimisticReviewReconciliation />
      <UseApiResourceBoundary />
      <ServerFunctionBoundaryMap />
      <React19PlatformBoundaries />
      <CompilerOptimizationModel />
      <CompilerRuleEvidencePanel />
      <React19MigrationGates />
      <SellerHubReact19BoundaryMap />
      <SellerHubReact19ActionsLab />
    </main>
  )
}
