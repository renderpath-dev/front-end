import { useState } from 'react'

function LocalOrderFilterDraft() {
  const [statusDraft, setStatusDraft] = useState('all')

  return (
    <label className="performance-field">
      <span>Locally owned status draft</span>
      <select
        onChange={(event) => setStatusDraft(event.currentTarget.value)}
        value={statusDraft}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
      </select>
    </label>
  )
}

function StableSellerSummary() {
  return (
    <section className="performance-result-box">
      <strong>Independent seller summary</strong>
      <p>$18,420 monthly revenue</p>
    </section>
  )
}

export function StateColocationRenderScope() {
  const [shellDensity, setShellDensity] = useState<'comfortable' | 'compact'>('comfortable')

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">09 / State colocation</p>
      <h2>Move transient state to the smallest owner before adding memoization</h2>
      <button
        onClick={() =>
          setShellDensity((density) => (density === 'comfortable' ? 'compact' : 'comfortable'))
        }
        type="button"
      >
        Shell density: {shellDensity}
      </button>
      <LocalOrderFilterDraft />
      <StableSellerSummary />
      <p className="performance-practice-note">
        Editing the draft updates its component, not this parent or the independent summary.
      </p>
    </article>
  )
}
