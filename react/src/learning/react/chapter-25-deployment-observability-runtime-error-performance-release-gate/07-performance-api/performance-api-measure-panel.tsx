import { createRouteTimingEvidence } from './performance-measure-model'
import { chapter25ReleaseId } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const routeMeasure = createRouteTimingEvidence(chapter25ReleaseId, '/react/chapter-25')

export function PerformanceApiMeasurePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="performance-api-title">
      <p className="release-evidence-card__eyebrow">9.7</p>
      <h2 id="performance-api-title">Performance API marks and measures</h2>
      <p>
        User Timing marks identify local runtime phases. They are useful lab evidence, not
        field telemetry or real user monitoring.
      </p>
      <p role="status">
        {routeMeasure.name}: {routeMeasure.duration}ms for {routeMeasure.route}
      </p>
    </section>
  )
}
