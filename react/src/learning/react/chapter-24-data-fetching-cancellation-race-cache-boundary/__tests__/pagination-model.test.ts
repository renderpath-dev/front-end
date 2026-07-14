import { describe, expect, it } from 'vitest'
import {
  appendUniquePageRows,
  createInitialPaginationState,
} from '../13-pagination-load-more/pagination-model'

describe('pagination model', () => {
  it('appends unique rows and prevents duplicates', () => {
    const firstState = appendUniquePageRows(createInitialPaginationState(), {
      hasMore: true,
      nextCursor: 'page-2',
      rows: [{ id: 'product-101' }],
    })
    const secondState = appendUniquePageRows(firstState, {
      hasMore: false,
      nextCursor: null,
      rows: [{ id: 'product-101' }, { id: 'product-102' }],
    })

    expect(secondState.rows).toEqual([{ id: 'product-101' }, { id: 'product-102' }])
    expect(secondState.hasMore).toBe(false)
  })
})
