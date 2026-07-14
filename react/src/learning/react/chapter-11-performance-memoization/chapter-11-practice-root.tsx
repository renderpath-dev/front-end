import { Link, Navigate, Route, Routes } from 'react-router'
import { RenderCommitBoundary } from './01-render-commit-boundary/render-commit-boundary'
import { ParentChildRenderBoundary } from './02-parent-child-render/parent-child-render-boundary'
import { ReconciliationKeyIdentity } from './03-reconciliation-key-identity/reconciliation-key-identity'
import { ReactMemoShallowCompare } from './04-react-memo-shallow-compare/react-memo-shallow-compare'
import { ReferentialEqualityProps } from './05-referential-equality-props/referential-equality-props'
import { UseMemoExpensiveDerivedData } from './06-usememo-derived-data/usememo-expensive-derived-data'
import { UseCallbackFunctionIdentity } from './07-usecallback-identity/usecallback-function-identity'
import { MemoCallbackComposition } from './08-memo-callback-composition/memo-callback-composition'
import { StateColocationRenderScope } from './09-state-colocation/state-colocation-render-scope'
import { ContextValueIdentityBoundary } from './10-context-value-boundary/context-value-identity-boundary'
import { ProfilerRenderEvidence } from './11-profiler-evidence/profiler-render-evidence'
import { LazySuspenseCodeSplitting } from './12-lazy-suspense-code-splitting/lazy-suspense-code-splitting'
import { SellerHubPerformanceWorkspace } from './sellerhub-performance-workspace/sellerhub-performance-workspace'
import './chapter-11-practice.css'

const practiceComponents = [
  <RenderCommitBoundary key="render-commit" />,
  <ParentChildRenderBoundary key="parent-child" />,
  <ReconciliationKeyIdentity key="reconciliation" />,
  <ReactMemoShallowCompare key="react-memo" />,
  <ReferentialEqualityProps key="referential-equality" />,
  <UseMemoExpensiveDerivedData key="usememo" />,
  <UseCallbackFunctionIdentity key="usecallback" />,
  <MemoCallbackComposition key="memo-callback" />,
  <StateColocationRenderScope key="state-colocation" />,
  <ContextValueIdentityBoundary key="context-value" />,
  <ProfilerRenderEvidence key="profiler" />,
  <LazySuspenseCodeSplitting key="lazy-suspense" />,
]

function Chapter11PracticeOverview() {
  return (
    <section aria-labelledby="performance-practice-title">
      <div className="chapter-eleven-section-heading">
        <div>
          <p>Mechanism practice</p>
          <h2 id="performance-practice-title">Measure work before adding optimization</h2>
        </div>
        <Link to="/react/chapter-11/catalog">Open SellerHub workspace</Link>
      </div>
      <div className="performance-practice-grid">{practiceComponents}</div>
    </section>
  )
}

function Chapter11Router() {
  return (
    <main className="chapter-eleven-shell">
      <header className="chapter-eleven-header">
        <div>
          <p className="chapter-eleven-eyebrow">React Chapter 11</p>
          <h1>Performance, Memoization, and Code Splitting</h1>
          <p>
            Separate render work, reconciliation, DOM commits, reference identity, profiling
            evidence, and code chunk loading before choosing an optimization.
          </p>
        </div>
        <nav aria-label="Chapter views" className="chapter-eleven-nav">
          <Link to="/react/chapter-11/practice">Mechanism practice</Link>
          <Link to="/react/chapter-11/catalog">SellerHub workspace</Link>
        </nav>
      </header>
      <Routes>
        <Route element={<Navigate replace to="/react/chapter-11/catalog" />} path="/react/chapter-11" />
        <Route element={<Chapter11PracticeOverview />} path="/react/chapter-11/practice" />
        <Route element={<SellerHubPerformanceWorkspace />} path="/react/chapter-11/*" />
        <Route element={<Navigate replace to="/react/chapter-11/catalog" />} path="*" />
      </Routes>
    </main>
  )
}

export function Chapter11PracticeRoot() {
  return <Chapter11Router />
}
