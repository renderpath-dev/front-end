export type ReactProfilerPhase = 'mount' | 'nested-update' | 'update'

export type ReactRenderMetricInput = {
  actualDuration: number
  baseDuration: number
  commitTime: number
  id: string
  phase: ReactProfilerPhase
  startTime: number
}

export type ReactRenderMetric = ReactRenderMetricInput & {
  budgetStatus: 'slow' | 'watch' | 'within-budget'
  memoizationRatio: number
}

export function normalizeReactProfilerEvent(
  input: ReactRenderMetricInput,
): ReactRenderMetric {
  const memoizationRatio =
    input.baseDuration === 0 ? 1 : input.actualDuration / input.baseDuration

  return {
    ...input,
    budgetStatus: classifyRenderDuration(input.actualDuration),
    memoizationRatio: Number(memoizationRatio.toFixed(2)),
  }
}

export function classifyRenderDuration(
  actualDuration: number,
): ReactRenderMetric['budgetStatus'] {
  if (actualDuration > 50) {
    return 'slow'
  }

  if (actualDuration > 16) {
    return 'watch'
  }

  return 'within-budget'
}
