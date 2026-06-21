import { lazy, Suspense, useState } from 'react'

const LazyDashboardPanel = lazy(() => import('./lazy-dashboard-panel'))

export function LazySuspenseCodeSplitting() {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">12 / Lazy code boundary</p>
      <h2>lazy caches a module promise; Suspense renders the loading fallback</h2>
      <button onClick={() => setShowPanel((visible) => !visible)} type="button">
        {showPanel ? 'Hide lazy panel' : 'Load lazy panel'}
      </button>
      {showPanel && (
        <Suspense fallback={<p className="performance-loading-state">Loading code chunk...</p>}>
          <LazyDashboardPanel />
        </Suspense>
      )}
      <p className="performance-practice-note">
        This boundary loads component code. It does not fetch dashboard data.
      </p>
    </article>
  )
}
