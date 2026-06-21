import { useState } from 'react'

function StaticSellerSummary() {
  return (
    <section className="performance-result-box">
      <strong>Seller summary</strong>
      <p>12 active products and 4 pending orders</p>
    </section>
  )
}

export function ParentChildRenderBoundary() {
  const [searchDraft, setSearchDraft] = useState('')

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">02 / Parent and child</p>
      <h2>Parent state updates call descendant component functions by default</h2>
      <label className="performance-field">
        <span>Parent-owned search draft</span>
        <input
          onChange={(event) => setSearchDraft(event.currentTarget.value)}
          placeholder="Type to update the parent"
          value={searchDraft}
        />
      </label>
      <p>
        Parent snapshot: <code>{searchDraft || 'empty'}</code>
      </p>
      <StaticSellerSummary />
      <p className="performance-practice-note">
        React can call StaticSellerSummary again while committing no changes inside its DOM output.
      </p>
    </article>
  )
}
