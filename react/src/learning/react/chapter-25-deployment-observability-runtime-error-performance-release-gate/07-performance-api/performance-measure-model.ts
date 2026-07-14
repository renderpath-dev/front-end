export type PerformanceMarkRecord = {
  name: string
  releaseId: string
  route: string
  startTime: number
}

export type PerformanceMeasureRecord = {
  duration: number
  endMark: string
  name: string
  releaseId: string
  route: string
  startMark: string
}

export function createPerformanceMarkName(
  releaseId: string,
  route: string,
  phase: string,
): string {
  return `${releaseId}:${route}:${phase}`
}

export function createPerformanceMeasure(
  name: string,
  startMark: PerformanceMarkRecord,
  endMark: PerformanceMarkRecord,
): PerformanceMeasureRecord {
  if (startMark.releaseId !== endMark.releaseId || startMark.route !== endMark.route) {
    throw new Error('Measure marks must belong to the same release and route.')
  }

  return {
    duration: endMark.startTime - startMark.startTime,
    endMark: endMark.name,
    name,
    releaseId: startMark.releaseId,
    route: startMark.route,
    startMark: startMark.name,
  }
}

export function createRouteTimingEvidence(
  releaseId: string,
  route: string,
): PerformanceMeasureRecord {
  const startMark: PerformanceMarkRecord = {
    name: createPerformanceMarkName(releaseId, route, 'route-start'),
    releaseId,
    route,
    startTime: 100,
  }
  const endMark: PerformanceMarkRecord = {
    name: createPerformanceMarkName(releaseId, route, 'route-ready'),
    releaseId,
    route,
    startTime: 184,
  }

  return createPerformanceMeasure('sellerhub-route-ready', startMark, endMark)
}
