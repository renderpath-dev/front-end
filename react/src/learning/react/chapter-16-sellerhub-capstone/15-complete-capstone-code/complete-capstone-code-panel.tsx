const deliverySlices = [
  'app and route composition',
  'design-system primitives',
  'runtime DTO guards and adapters',
  'catalog, detail, cart, checkout, and orders',
  'operations and portfolio evidence',
  'unit, behavior, and integration tests',
] as const

export function CompleteCapstoneCodePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="complete-capstone-title">
      <p className="chapter16-eyebrow">9.15 Complete capstone</p>
      <h2 id="complete-capstone-title">Deliver one coherent feature system</h2>
      <ol className="chapter16-list">
        {deliverySlices.map((slice) => (
          <li key={slice}>{slice}</li>
        ))}
      </ol>
    </section>
  )
}
