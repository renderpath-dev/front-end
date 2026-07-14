import { describe, expect, it } from 'vitest'
import {
  classifyRenderDuration,
  normalizeReactProfilerEvent,
} from '../08-react-profiler/react-render-metric-model'

describe('react render metric model', () => {
  it('classifies actualDuration and baseDuration evidence', () => {
    const metric = normalizeReactProfilerEvent({
      actualDuration: 12,
      baseDuration: 40,
      commitTime: 100,
      id: 'SellerHubPanel',
      phase: 'update',
      startTime: 80,
    })

    expect(metric.budgetStatus).toBe('within-budget')
    expect(metric.memoizationRatio).toBe(0.3)
    expect(classifyRenderDuration(60)).toBe('slow')
  })
})
