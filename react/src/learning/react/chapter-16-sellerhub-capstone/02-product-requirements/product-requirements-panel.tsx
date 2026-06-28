const acceptanceCriteria = [
  'Catalog criteria are represented in the URL.',
  'Checkout exposes validation, pending, known error, and success states.',
  'Seller order mutation requires both role permission and a feature flag.',
  'Every release claim points to code, tests, or a review document.',
] as const

export function ProductRequirementsPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="requirements-title">
      <p className="chapter16-eyebrow">9.2 Product requirements</p>
      <h2 id="requirements-title">Turn user journeys into observable acceptance criteria</h2>
      <ol className="chapter16-list">
        {acceptanceCriteria.map((criterion) => (
          <li key={criterion}>{criterion}</li>
        ))}
      </ol>
    </section>
  )
}
