import { normalizeReactProfilerEvent } from './react-render-metric-model'

const renderMetric = normalizeReactProfilerEvent({
  actualDuration: 12,
  baseDuration: 38,
  commitTime: 260,
  id: 'SellerHubCatalogPanel',
  phase: 'update',
  startTime: 240,
})

export function ReactProfilerBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="react-profiler-title">
      <p className="release-evidence-card__eyebrow">9.8</p>
      <h2 id="react-profiler-title">React Profiler boundary</h2>
      <p>
        Profiler evidence describes React render cost and commit timing. It does not
        measure network latency, backend work, or total user experience by itself.
      </p>
      <dl className="release-evidence-definition-grid">
        <div>
          <dt>Actual duration</dt>
          <dd>{renderMetric.actualDuration}ms</dd>
        </div>
        <div>
          <dt>Budget status</dt>
          <dd>{renderMetric.budgetStatus}</dd>
        </div>
      </dl>
    </section>
  )
}
