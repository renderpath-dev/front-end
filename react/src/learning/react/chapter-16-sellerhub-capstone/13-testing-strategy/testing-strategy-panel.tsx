const testLayers = [
  ['Unit', 'Adapter and cart reducer invariants'],
  ['Component', 'Checkout validation, pending, error, and success behavior'],
  ['Integration', 'Route navigation, URL filters, operations, and error reporting'],
  ['Quality gates', 'Lint, typecheck, test, and production build'],
] as const

export function TestingStrategyPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="testing-strategy-title">
      <p className="chapter16-eyebrow">9.13 Testing strategy</p>
      <h2 id="testing-strategy-title">Test risks at the narrowest useful boundary</h2>
      <div className="chapter16-grid">
        {testLayers.map(([layer, evidence]) => (
          <article className="chapter16-card" key={layer}>
            <h3>{layer}</h3>
            <p>{evidence}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
