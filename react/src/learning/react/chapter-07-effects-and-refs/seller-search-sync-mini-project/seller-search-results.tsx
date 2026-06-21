import type { SearchSyncStatus, SellerProduct } from './seller-search-types'

type SellerSearchResultsProps = {
  products: SellerProduct[]
  status: SearchSyncStatus
  syncedCriteria: string
}

export function SellerSearchResults({
  products,
  status,
  syncedCriteria,
}: SellerSearchResultsProps) {
  return (
    <section aria-labelledby="seller-search-results-title" className="seller-search-results">
      <div className="seller-search-results-heading">
        <div>
          <p className="project-eyebrow">Derived during render</p>
          <h3 id="seller-search-results-title">Visible inventory</h3>
        </div>
        <span className={`sync-badge sync-badge-${status}`}>
          {status === 'pending' ? 'Syncing' : 'Synchronized'}
        </span>
      </div>

      <p className="sync-summary">
        Last external sync: {syncedCriteria || 'Waiting for the first result'}
      </p>

      {products.length === 0 ? (
        <p className="seller-search-empty">No products match the current render inputs.</p>
      ) : (
        <ul className="seller-product-list">
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <span>{product.category}</span>
              </div>
              <div className="seller-product-metrics">
                <span>${product.price}</span>
                <span>{product.stock} in stock</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
