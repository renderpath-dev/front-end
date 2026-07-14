import { useState } from 'react'
import {
  appendUniquePageRows,
  createInitialPaginationState,
} from '../13-pagination-load-more/pagination-model'
import type { CatalogProduct } from './sellerhub-data-fetching-data'
import { sellerHubProducts } from './sellerhub-data-fetching-data'

export function PaginationLoadMoreLab() {
  const [state, setState] = useState(() => createInitialPaginationState<CatalogProduct>())

  function loadMore(): void {
    setState((currentState) =>
      appendUniquePageRows(currentState, {
        hasMore: currentState.rows.length < sellerHubProducts.length,
        nextCursor: currentState.rows.length >= 2 ? null : 'page-2',
        rows: sellerHubProducts.slice(currentState.rows.length, currentState.rows.length + 2),
      }),
    )
  }

  return (
    <section className="data-fetching-card" aria-labelledby="pagination-lab-title">
      <h3 id="pagination-lab-title">Pagination load-more lab</h3>
      <button onClick={loadMore} type="button">
        Load more products
      </button>
      <p role="status">Loaded products: {state.rows.length}</p>
      <ul>
        {state.rows.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  )
}
