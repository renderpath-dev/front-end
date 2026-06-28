const lifecycleStates = [
  ['loading', 'Request criteria are committed and the result is pending.'],
  ['success', 'A validated DTO has been adapted for rendering.'],
  ['not-found', 'The product ID is valid routing state but has no resource.'],
  ['error', 'A normalized service failure can be reported and retried.'],
] as const

export function ProductDetailLifecyclePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="product-lifecycle-title">
      <p className="chapter16-eyebrow">9.7 Product detail lifecycle</p>
      <h2 id="product-lifecycle-title">Model resource states as distinct UI branches</h2>
      <div className="chapter16-grid">
        {lifecycleStates.map(([state, meaning]) => (
          <article className="chapter16-card" key={state}>
            <h3>{state}</h3>
            <p>{meaning}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
