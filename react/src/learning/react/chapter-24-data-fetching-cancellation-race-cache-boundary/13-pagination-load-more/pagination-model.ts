export type PageRow = {
  id: string
}

export type PageResult<TRow extends PageRow> = {
  hasMore: boolean
  nextCursor: string | null
  rows: TRow[]
}

export type PaginationState<TRow extends PageRow> = {
  cursor: string | null
  hasMore: boolean
  rows: TRow[]
}

export function createInitialPaginationState<TRow extends PageRow>(): PaginationState<TRow> {
  return {
    cursor: null,
    hasMore: true,
    rows: [],
  }
}

export function appendUniquePageRows<TRow extends PageRow>(
  state: PaginationState<TRow>,
  page: PageResult<TRow>,
): PaginationState<TRow> {
  const seenIds = new Set(state.rows.map((row) => row.id))
  const uniqueRows = page.rows.filter((row) => !seenIds.has(row.id))

  return {
    cursor: page.nextCursor,
    hasMore: page.hasMore,
    rows: [...state.rows, ...uniqueRows],
  }
}
