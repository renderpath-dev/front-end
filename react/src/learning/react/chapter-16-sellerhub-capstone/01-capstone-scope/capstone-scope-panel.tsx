const capstoneBoundaries = [
  ['Product', 'Catalog, cart, checkout, seller orders, operations, and evidence'],
  ['Runtime', 'Local React client with deterministic mock gateway responses'],
  ['Excluded', 'Real auth, payments, backend persistence, and production telemetry'],
] as const

export function CapstoneScopePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="capstone-scope-title">
      <p className="chapter16-eyebrow">9.1 Capstone scope</p>
      <h2 id="capstone-scope-title">Define the delivery boundary before coding</h2>
      <div className="chapter16-grid">
        {capstoneBoundaries.map(([label, value]) => (
          <article className="chapter16-card" key={label}>
            <h3>{label}</h3>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
