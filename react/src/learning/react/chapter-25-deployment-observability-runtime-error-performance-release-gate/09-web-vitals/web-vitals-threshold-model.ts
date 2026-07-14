export type CoreWebVitalName = 'CLS' | 'INP' | 'LCP'

export type CoreWebVitalRating = 'good' | 'needs-improvement' | 'poor'

export type WebVitalEvidence = {
  metricName: CoreWebVitalName
  rating: CoreWebVitalRating
  sampleBoundary: 'field' | 'lab-model'
  value: number
}

const thresholds: Record<CoreWebVitalName, { good: number; poor: number }> = {
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
}

export function classifyCoreWebVital(
  metricName: CoreWebVitalName,
  value: number,
): CoreWebVitalRating {
  const threshold = thresholds[metricName]

  if (value <= threshold.good) {
    return 'good'
  }

  if (value <= threshold.poor) {
    return 'needs-improvement'
  }

  return 'poor'
}

export function createWebVitalEvidence(
  metricName: CoreWebVitalName,
  value: number,
  sampleBoundary: WebVitalEvidence['sampleBoundary'],
): WebVitalEvidence {
  return {
    metricName,
    rating: classifyCoreWebVital(metricName, value),
    sampleBoundary,
    value,
  }
}
