import { useDeferredValue, useMemo, useState } from 'react'
import {
  filterSellerHubProducts,
  sellerHubApiGapCategories,
  sellerHubApiGapProducts,
} from './sellerhub-api-gap-data'
import type { SellerHubApiGapCategory, SellerHubApiGapProduct } from './sellerhub-api-gap-data'

type DeferredProductSearchProps = {
  products?: SellerHubApiGapProduct[]
}

export function DeferredProductSearch({
  products = sellerHubApiGapProducts,
}: DeferredProductSearchProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SellerHubApiGapCategory>('All')
  const deferredQuery = useDeferredValue(query)
  const visibleProducts = useMemo(
    () => filterSellerHubProducts(products, deferredQuery, category),
    [category, deferredQuery, products],
  )

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useDeferredValue</p>
      <h3>Deferred product search</h3>
      <form className="api-gap-form">
        <label htmlFor="lab-product-search">Search products</label>
        <input
          id="lab-product-search"
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Try Studio or Scale"
          value={query}
        />
        <label htmlFor="lab-product-category">Product category</label>
        <select
          id="lab-product-category"
          onChange={(event) => setCategory(event.currentTarget.value as SellerHubApiGapCategory)}
          value={category}
        >
          {sellerHubApiGapCategories.map((nextCategory) => (
            <option key={nextCategory} value={nextCategory}>
              {nextCategory}
            </option>
          ))}
        </select>
      </form>
      <div className="api-gap-pill-row" aria-live="polite">
        <span className={`api-gap-pill${query !== deferredQuery ? ' api-gap-pill-warning' : ''}`}>
          {query !== deferredQuery ? 'Deferred query is catching up' : 'Deferred query is current'}
        </span>
        <span className="api-gap-pill">{visibleProducts.length} products</span>
      </div>
      <ul className="api-gap-list" aria-label="Deferred product results">
        {visibleProducts.map((product) => (
          <li className="sellerhub-gap-product" key={product.id}>
            <strong>{product.name}</strong>
            <span>
              {product.category} · {product.stage} · margin {product.margin}%
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
