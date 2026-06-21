import { memo, useState } from 'react'

type PricingPolicy = {
  currency: 'USD'
  taxRate: number
}

const stablePricingPolicy: PricingPolicy = {
  currency: 'USD',
  taxRate: 0.08,
}

const MemoizedPricingPolicy = memo(function PricingPolicyView({
  policy,
}: {
  policy: PricingPolicy
}) {
  return (
    <section className="performance-result-box">
      <strong>Pricing policy</strong>
      <p>
        {policy.currency} / {policy.taxRate * 100}% tax
      </p>
    </section>
  )
})

export function ReferentialEqualityProps() {
  const [parentTick, setParentTick] = useState(0)
  const [useStableReference, setUseStableReference] = useState(false)
  const policy = useStableReference
    ? stablePricingPolicy
    : { currency: 'USD' as const, taxRate: 0.08 }

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">05 / Referential equality</p>
      <h2>Equal object contents do not imply equal object identity</h2>
      <label className="performance-toggle-row">
        <input
          checked={useStableReference}
          onChange={(event) => setUseStableReference(event.currentTarget.checked)}
          type="checkbox"
        />
        <span>Reuse a stable module-level policy object</span>
      </label>
      <button onClick={() => setParentTick((tick) => tick + 1)} type="button">
        Re-render parent ({parentTick})
      </button>
      <MemoizedPricingPolicy policy={policy} />
      <p className="performance-practice-note">
        The inline object is new on every parent render, so Object.is reports a changed prop.
      </p>
    </article>
  )
}
