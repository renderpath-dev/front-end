import { useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  revenue: number
}

const products: Product[] = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  name: `Product ${String(index + 1).padStart(3, '0')}`,
  revenue: ((index * 37) % 500) + 50,
}))

function deriveVisibleProducts(query: string, sortDirection: 'asc' | 'desc') {
  let checksum = 0

  for (let index = 0; index < 40_000; index += 1) {
    checksum = (checksum + index) % 997
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    .sort((left, right) =>
      sortDirection === 'asc' ? left.revenue - right.revenue : right.revenue - left.revenue,
    )

  return { checksum, visibleProducts }
}

export function UseMemoExpensiveDerivedData() {
  const [query, setQuery] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isHighlighted, setIsHighlighted] = useState(false)
  const result = useMemo(
    () => deriveVisibleProducts(query, sortDirection),
    [query, sortDirection],
  )

  return (
    <article className={isHighlighted ? 'performance-practice-panel performance-panel-highlighted' : 'performance-practice-panel'}>
      <p className="performance-practice-kicker">06 / useMemo result cache</p>
      <h2>Cache an expensive pure derivation behind stable dependencies</h2>
      <label className="performance-field">
        <span>Product query</span>
        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />
      </label>
      <div className="performance-control-row">
        <button
          onClick={() => setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))}
          type="button"
        >
          Sort {sortDirection}
        </button>
        <button onClick={() => setIsHighlighted((highlighted) => !highlighted)} type="button">
          Toggle unrelated highlight
        </button>
      </div>
      <p>
        {result.visibleProducts.length} products / checksum {result.checksum}
      </p>
      <p className="performance-practice-note">
        Highlight updates re-render the component but reuse the cached derivation result.
      </p>
    </article>
  )
}
