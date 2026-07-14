import { createWebVitalEvidence } from './web-vitals-threshold-model'

const webVitalEvidence = [
  createWebVitalEvidence('LCP', 2100, 'lab-model'),
  createWebVitalEvidence('INP', 180, 'lab-model'),
  createWebVitalEvidence('CLS', 0.08, 'lab-model'),
]

export function WebVitalsBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="web-vitals-title">
      <p className="release-evidence-card__eyebrow">9.9</p>
      <h2 id="web-vitals-title">Web Vitals boundary</h2>
      <p>
        LCP, INP, and CLS are field-oriented user experience metrics. This page shows
        deterministic teaching data and does not claim real user monitoring.
      </p>
      <ul>
        {webVitalEvidence.map((item) => (
          <li key={item.metricName}>
            {item.metricName}: {item.value} ({item.rating}, {item.sampleBoundary})
          </li>
        ))}
      </ul>
    </section>
  )
}
