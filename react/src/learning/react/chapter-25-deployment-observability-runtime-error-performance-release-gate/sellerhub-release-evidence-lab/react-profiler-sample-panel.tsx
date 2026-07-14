import { Profiler, useRef, useState } from 'react'
import type { ProfilerOnRenderCallback } from 'react'
import { normalizeReactProfilerEvent } from '../08-react-profiler/react-render-metric-model'
import type { ReactRenderMetric } from '../08-react-profiler/react-render-metric-model'

const initialMetric = normalizeReactProfilerEvent({
  actualDuration: 10,
  baseDuration: 30,
  commitTime: 120,
  id: 'SellerHubProfilerSample',
  phase: 'mount',
  startTime: 100,
})

export function ReactProfilerSamplePanel() {
  const capturedRef = useRef(false)
  const [metric, setMetric] = useState<ReactRenderMetric>(initialMetric)

  const handleRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    if (capturedRef.current) {
      return
    }

    capturedRef.current = true
    setMetric(
      normalizeReactProfilerEvent({
        actualDuration,
        baseDuration,
        commitTime,
        id,
        phase,
        startTime,
      }),
    )
  }

  return (
    <section className="release-evidence-card" aria-labelledby="react-profiler-sample-title">
      <h3 id="react-profiler-sample-title">React Profiler sample panel</h3>
      <Profiler id="SellerHubProfilerSample" onRender={handleRender}>
        <div className="release-evidence-nested-panel">
          <p>Profiled local render boundary for the release evidence lab.</p>
        </div>
      </Profiler>
      <p role="status">
        {metric.id}: {metric.actualDuration.toFixed(2)}ms, {metric.budgetStatus}
      </p>
    </section>
  )
}
