import { memo, useCallback, useState } from 'react'

type ProductActionRowProps = {
  productId: string
  productName: string
  onRestock: (productId: string) => void
}

const MemoizedProductActionRow = memo(function ProductActionRow({
  productId,
  productName,
  onRestock,
}: ProductActionRowProps) {
  return (
    <section className="performance-result-box">
      <strong>{productName}</strong>
      <button onClick={() => onRestock(productId)} type="button">
        Restock
      </button>
    </section>
  )
})

export function MemoCallbackComposition() {
  const [searchDraft, setSearchDraft] = useState('')
  const [lastRestockedId, setLastRestockedId] = useState<string | null>(null)
  const handleRestock = useCallback((productId: string) => {
    setLastRestockedId(productId)
  }, [])

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">08 / memo and useCallback</p>
      <h2>Stable callback identity matters when a memoized child receives it</h2>
      <label className="performance-field">
        <span>Unrelated parent search draft</span>
        <input
          onChange={(event) => setSearchDraft(event.currentTarget.value)}
          value={searchDraft}
        />
      </label>
      <MemoizedProductActionRow
        onRestock={handleRestock}
        productId="lamp-101"
        productName="Arc Desk Lamp"
      />
      <p>Last restocked: {lastRestockedId ?? 'none'}</p>
      <p className="performance-practice-note">
        Without useCallback, a new onRestock function would invalidate the memo comparison.
      </p>
    </article>
  )
}
