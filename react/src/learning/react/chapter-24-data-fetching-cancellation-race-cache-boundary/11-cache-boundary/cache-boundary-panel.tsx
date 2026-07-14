import { createSimpleResourceCache } from './simple-resource-cache'

export function CacheBoundaryPanel() {
  const cache = createSimpleResourceCache<string[]>()
  cache.writeSuccess('catalog?sellerId=seller-42', ['Desk Lamp Pro'])
  const entry = cache.read('catalog?sellerId=seller-42')

  return (
    <section className="data-fetching-card" aria-labelledby="cache-boundary-title">
      <p className="data-fetching-card__eyebrow">9.11</p>
      <h2 id="cache-boundary-title">Cache key, cache entry, and dedupe boundary</h2>
      <p>
        A cache entry is indexed by resource identity. In-flight dedupe belongs to the
        cache key boundary, while confirmed server authority still belongs to the server.
      </p>
      <p>
        Cache entry status: <strong>{entry?.status ?? 'missing'}</strong>.
      </p>
    </section>
  )
}
