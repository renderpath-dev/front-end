type ProductListSummaryProps = {
  visibleCount: number
  totalCount: number
}

export function ProductListSummary({ visibleCount, totalCount }: ProductListSummaryProps) {
  return (
    <p className="product-list-summary" aria-live="polite">
      Showing <strong>{visibleCount}</strong> of <strong>{totalCount}</strong> products
    </p>
  )
}
