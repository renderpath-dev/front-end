import { useMemo, useState } from 'react'
import { createSimpleResourceCache } from '../11-cache-boundary/simple-resource-cache'

export function CacheKeyDedupePanel() {
  const cache = useMemo(() => createSimpleResourceCache<string[]>(), [])
  const [dedupeCount, setDedupeCount] = useState(0)

  function runDedupeCheck(): void {
    let factoryCalls = 0
    const firstPromise = cache.getOrCreateInFlight('catalog?sellerId=seller-42', () => {
      factoryCalls += 1
      return Promise.resolve(['Desk Lamp Pro'])
    })
    const secondPromise = cache.getOrCreateInFlight('catalog?sellerId=seller-42', () => {
      factoryCalls += 1
      return Promise.resolve(['Desk Lamp Pro'])
    })

    if (firstPromise === secondPromise) {
      setDedupeCount(factoryCalls)
    }
  }

  return (
    <section className="data-fetching-card" aria-labelledby="cache-dedupe-title">
      <h3 id="cache-dedupe-title">Cache key and dedupe panel</h3>
      <p>In-flight dedupe is keyed by resource identity.</p>
      <button onClick={runDedupeCheck} type="button">
        Check dedupe
      </button>
      <p role="status">Request factory calls: {dedupeCount}</p>
    </section>
  )
}
