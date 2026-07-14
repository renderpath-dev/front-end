import { describe, expect, it } from 'vitest'
import {
  classifyCoreWebVital,
  createWebVitalEvidence,
} from '../09-web-vitals/web-vitals-threshold-model'

describe('web vitals threshold model', () => {
  it('classifies LCP, INP, and CLS', () => {
    expect(classifyCoreWebVital('LCP', 2400)).toBe('good')
    expect(classifyCoreWebVital('LCP', 3900)).toBe('needs-improvement')
    expect(classifyCoreWebVital('INP', 650)).toBe('poor')
    expect(classifyCoreWebVital('CLS', 0.1)).toBe('good')
    expect(createWebVitalEvidence('CLS', 0.2, 'lab-model').sampleBoundary).toBe(
      'lab-model',
    )
  })
})
