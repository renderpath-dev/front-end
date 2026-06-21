import { memo, useState } from 'react'

type OrderSummaryProps = {
  pendingCount: number
}

const MemoizedOrderSummary = memo(function OrderSummary({ pendingCount }: OrderSummaryProps) {
  return (
    <section className="performance-result-box">
      <strong>Memoized order summary</strong>
      <p>{pendingCount} pending orders</p>
    </section>
  )
})

export function ReactMemoShallowCompare() {
  const [pendingCount, setPendingCount] = useState(4)
  const [isCompact, setIsCompact] = useState(false)

  return (
    <article className={isCompact ? 'performance-practice-panel performance-panel-compact' : 'performance-practice-panel'}>
      <p className="performance-practice-kicker">04 / React.memo</p>
      <h2>memo can skip a child when every prop is shallowly equal</h2>
      <div className="performance-control-row">
        <button onClick={() => setIsCompact((compact) => !compact)} type="button">
          Toggle parent density
        </button>
        <button onClick={() => setPendingCount((count) => count + 1)} type="button">
          Add pending order
        </button>
      </div>
      <MemoizedOrderSummary pendingCount={pendingCount} />
      <p className="performance-practice-note">
        Density changes only parent state. Count changes the memoized child prop.
      </p>
    </article>
  )
}
