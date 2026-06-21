import { Profiler, useState } from 'react'
import type { ProfilerOnRenderCallback } from 'react'

function DashboardMetricPanel({ orderCount }: { orderCount: number }) {
  let checksum = 0

  for (let index = 0; index < 50_000; index += 1) {
    checksum = (checksum + orderCount + index) % 1_009
  }

  return (
    <section className="performance-result-box">
      <strong>Dashboard metric</strong>
      <p>{orderCount} orders / checksum {checksum}</p>
    </section>
  )
}

const handleProfileRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) => {
  console.info('Profiler evidence', {
    actualDuration,
    baseDuration,
    commitTime,
    id,
    phase,
    startTime,
  })
}

export function ProfilerRenderEvidence() {
  const [orderCount, setOrderCount] = useState(12)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">11 / Profiler evidence</p>
      <h2>Measure a committed subtree before choosing an optimization</h2>
      <button onClick={() => setOrderCount((count) => count + 1)} type="button">
        Add order
      </button>
      <Profiler id="DashboardMetricPanel" onRender={handleProfileRender}>
        <DashboardMetricPanel orderCount={orderCount} />
      </Profiler>
      <p className="performance-practice-note">
        Inspect actualDuration and baseDuration in the browser console.
      </p>
    </article>
  )
}
