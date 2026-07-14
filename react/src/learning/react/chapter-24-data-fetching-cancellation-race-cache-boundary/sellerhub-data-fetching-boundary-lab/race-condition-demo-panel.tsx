import { useRef, useState } from 'react'
import { createRequestSequenceGuard } from '../06-race-conditions/request-sequence-guard'

export function RaceConditionDemoPanel() {
  const guardRef = useRef(createRequestSequenceGuard())
  const [committedValue, setCommittedValue] = useState('none')

  function simulateOutOfOrderResponses(): void {
    const slowRequestId = guardRef.current.startRequest()
    const fastRequestId = guardRef.current.startRequest()
    const staleCommit = guardRef.current.completeIfLatest(slowRequestId, 'stale response')
    const latestCommit = guardRef.current.completeIfLatest(fastRequestId, 'latest response')
    setCommittedValue(latestCommit ?? staleCommit ?? 'ignored stale response')
  }

  return (
    <section className="data-fetching-card" aria-labelledby="race-demo-title">
      <h3 id="race-demo-title">Race condition demo panel</h3>
      <p>Ignoring a stale response prevents UI commit, but it does not cancel network.</p>
      <button onClick={simulateOutOfOrderResponses} type="button">
        Simulate race
      </button>
      <p role="status">Committed response: {committedValue}</p>
    </section>
  )
}
