import { useDeferredValue, useMemo, useState } from 'react'

const catalogProducts = [
  { id: 'sku-stand', name: 'Adjustable laptop stand', category: 'Ergonomics', demand: 81 },
  { id: 'sku-light', name: 'Studio key light', category: 'Creator', demand: 67 },
  { id: 'sku-dock', name: 'USB-C seller dock', category: 'Operations', demand: 74 },
  { id: 'sku-scale', name: 'Parcel weight scale', category: 'Operations', demand: 58 },
  { id: 'sku-mic', name: 'Podcast microphone', category: 'Creator', demand: 43 },
]

export function DeferredCatalogSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  const visibleProducts = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    return catalogProducts
      .filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery),
      )
      .map((product) => ({
        ...product,
        score: calculateDemandScore(product.demand, normalizedQuery.length),
      }))
  }, [deferredQuery])

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useDeferredValue</p>
      <h3>Deferred catalog search</h3>
      <form className="api-gap-form">
        <label htmlFor="deferred-catalog-query">Search catalog</label>
        <input
          id="deferred-catalog-query"
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Try light or operations"
          value={query}
        />
      </form>
      <div className="api-gap-pill-row" aria-live="polite">
        <span className={`api-gap-pill${isStale ? ' api-gap-pill-warning' : ''}`}>
          {isStale ? 'Showing deferred results' : 'Results are current'}
        </span>
        <span className="api-gap-pill">{visibleProducts.length} matches</span>
      </div>
      <ul className="api-gap-list" aria-label="Deferred catalog results">
        {visibleProducts.map((product) => (
          <li className="sellerhub-gap-product" key={product.id}>
            <strong>{product.name}</strong>
            <span>
              {product.category} · demand score {product.score}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function calculateDemandScore(demand: number, queryWeight: number): number {
  let score = demand

  for (let step = 0; step < 800; step += 1) {
    score += (step % 7) * queryWeight
  }

  return Math.round(score / 10)
}
