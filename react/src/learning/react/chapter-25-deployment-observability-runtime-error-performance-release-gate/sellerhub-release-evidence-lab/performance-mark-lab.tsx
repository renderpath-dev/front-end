import { useState } from 'react'
import { createRouteTimingEvidence } from '../07-performance-api/performance-measure-model'
import { chapter25ReleaseId } from './sellerhub-release-evidence-data'

export function PerformanceMarkLab() {
  const [measureText, setMeasureText] = useState('No route measure recorded.')

  function recordRouteMeasure(): void {
    const measure = createRouteTimingEvidence(chapter25ReleaseId, '/react/chapter-25')
    setMeasureText(`${measure.name}: ${measure.duration}ms`)
  }

  return (
    <section className="release-evidence-card" aria-labelledby="performance-mark-lab-title">
      <h3 id="performance-mark-lab-title">Performance mark lab</h3>
      <p>
        Deterministic route timing evidence models performance.mark and performance.measure
        without claiming field telemetry.
      </p>
      <button type="button" onClick={recordRouteMeasure}>Record route measure</button>
      <p role="status">{measureText}</p>
    </section>
  )
}
