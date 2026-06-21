import { useCallback, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { deriveVisibleProducts } from './derive-visible-products'
import type { ProductSort } from './derive-visible-products'
import { MemoizedProductRow } from './memoized-product-row'
import { performanceProducts } from './sellerhub-performance-data'

type CatalogFilterFormProps = {
  initialQuery: string
  initialSort: ProductSort
  onCommit: (query: string, sort: ProductSort) => void
}

function CatalogFilterForm({ initialQuery, initialSort, onCommit }: CatalogFilterFormProps) {
  const [queryDraft, setQueryDraft] = useState(initialQuery)
  const [sortDraft, setSortDraft] = useState<ProductSort>(initialSort)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onCommit(queryDraft, sortDraft)
  }

  return (
    <form className="sellerhub-performance-filters" onSubmit={handleSubmit}>
      <label className="performance-field">
        <span>Local query draft</span>
        <input onChange={(event) => setQueryDraft(event.currentTarget.value)} value={queryDraft} />
      </label>
      <label className="performance-field">
        <span>Sort draft</span>
        <select
          onChange={(event) => setSortDraft(event.currentTarget.value as ProductSort)}
          value={sortDraft}
        >
          <option value="price-asc">Price ascending</option>
          <option value="price-desc">Price descending</option>
        </select>
      </label>
      <button type="submit">Commit filters to URL</button>
    </form>
  )
}

function parseSort(value: string | null): ProductSort {
  return value === 'price-asc' ? 'price-asc' : 'price-desc'
}

export default function ProductCatalogPerformancePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const committedQuery = searchParams.get('q') ?? ''
  const committedSort = parseSort(searchParams.get('sort'))
  const visibleResult = useMemo(
    () => deriveVisibleProducts(performanceProducts, committedQuery, committedSort),
    [committedQuery, committedSort],
  )
  const handleCommitFilters = useCallback(
    (query: string, sort: ProductSort) => {
      const nextParams = new URLSearchParams()

      if (query.trim()) {
        nextParams.set('q', query.trim())
      }

      nextParams.set('sort', sort)
      setSearchParams(nextParams)
    },
    [setSearchParams],
  )
  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProductId(productId)
  }, [])

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Catalog performance boundary</h3>
        </div>
        <code>{visibleResult.products.length} visible / checksum {visibleResult.checksum}</code>
      </div>
      <CatalogFilterForm
        initialQuery={committedQuery}
        initialSort={committedSort}
        key={`${committedQuery}:${committedSort}`}
        onCommit={handleCommitFilters}
      />
      <p>Selected product: {selectedProductId ?? 'none'}</p>
      <ul className="sellerhub-performance-list">
        {visibleResult.products.slice(0, 12).map((product) => (
          <MemoizedProductRow
            key={product.id}
            onSelect={handleSelectProduct}
            product={product}
          />
        ))}
      </ul>
    </section>
  )
}
