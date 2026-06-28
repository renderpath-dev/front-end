type VisibleSummaryPanelProps = {
  productCount: number
  orderCount: number
  hasErrors: boolean
}

export function VisibleSummaryPanel({
  productCount,
  orderCount,
  hasErrors,
}: VisibleSummaryPanelProps) {
  return (
    <section className="practice-panel" aria-labelledby="visible-summary-title">
      <p className="skill-pill">Component output</p>
      <h2 id="visible-summary-title">Visible SellerHub summary</h2>
      <dl className="summary-list">
        <div>
          <dt>Visible products</dt>
          <dd>{productCount}</dd>
        </div>
        <div>
          <dt>Open orders</dt>
          <dd>{orderCount}</dd>
        </div>
      </dl>
      {hasErrors ? (
        <p role="alert">SellerHub needs attention.</p>
      ) : (
        <p>SellerHub is ready.</p>
      )}
    </section>
  )
}
