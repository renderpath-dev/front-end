import { createWebVitalEvidence } from '../09-web-vitals/web-vitals-threshold-model'

const vitals = [
  createWebVitalEvidence('LCP', 2200, 'lab-model'),
  createWebVitalEvidence('INP', 190, 'lab-model'),
  createWebVitalEvidence('CLS', 0.07, 'lab-model'),
]

export function WebVitalsThresholdCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="web-vitals-card-title">
      <h3 id="web-vitals-card-title">Web Vitals threshold card</h3>
      <p>
        Values are deterministic teaching data. They are not real user monitoring or field
        percentile data.
      </p>
      <ul>
        {vitals.map((vital) => (
          <li key={vital.metricName}>
            {vital.metricName}: {vital.rating}
          </li>
        ))}
      </ul>
    </section>
  )
}
