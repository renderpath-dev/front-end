import { describe, expect, it } from 'vitest'
import {
  createPerformanceMarkName,
  createPerformanceMeasure,
  createRouteTimingEvidence,
} from '../07-performance-api/performance-measure-model'

describe('performance measure model', () => {
  it('records marks and measures deterministically', () => {
    const startMark = {
      name: createPerformanceMarkName('release-25', '/react/chapter-25', 'start'),
      releaseId: 'release-25',
      route: '/react/chapter-25',
      startTime: 10,
    }
    const endMark = {
      name: createPerformanceMarkName('release-25', '/react/chapter-25', 'ready'),
      releaseId: 'release-25',
      route: '/react/chapter-25',
      startTime: 70,
    }
    const measure = createPerformanceMeasure('route-ready', startMark, endMark)

    expect(measure.duration).toBe(60)
    expect(createRouteTimingEvidence('release-25', '/react/chapter-25').duration).toBe(84)
  })
})
