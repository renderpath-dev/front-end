import {
  appendUniquePageRows,
  createInitialPaginationState,
} from './pagination-model'

export function PaginationLoadMorePanel() {
  const state = appendUniquePageRows(createInitialPaginationState(), {
    hasMore: true,
    nextCursor: 'page-2',
    rows: [{ id: 'product-101' }, { id: 'product-101' }],
  })

  return (
    <section className="data-fetching-card" aria-labelledby="pagination-title">
      <p className="data-fetching-card__eyebrow">9.13</p>
      <h2 id="pagination-title">Pagination and load-more boundary</h2>
      <p>
        Initial loading, loading the next page, empty first page, and end of list are
        different UI states. The append path must guard duplicate entity ids.
      </p>
      <p>
        Unique rows after append: <strong>{state.rows.length}</strong>.
      </p>
    </section>
  )
}
