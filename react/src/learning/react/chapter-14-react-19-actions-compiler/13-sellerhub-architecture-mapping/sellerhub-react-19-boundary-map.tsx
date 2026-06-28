const sellerHubBoundaries = [
  {
    scenario: 'Checkout submit',
    currentOwner: 'Client Action with result and pending state',
    futureBoundary: 'Framework Server Function after a separate migration',
  },
  {
    scenario: 'Cart quantity',
    currentOwner: 'Sequential Action queue plus optimistic quantity',
    futureBoundary: 'Validated server mutation and reconciliation',
  },
  {
    scenario: 'Product review',
    currentOwner: 'Optimistic append with rollback',
    futureBoundary: 'Server-confirmed review identifier and content',
  },
  {
    scenario: 'Seller order status',
    currentOwner: 'Typed Action result union',
    futureBoundary: 'Authorized server-side mutation',
  },
  {
    scenario: 'Product card',
    currentOwner: 'Pure component and immutable inputs',
    futureBoundary: 'Measured compiler candidate',
  },
  {
    scenario: 'Dashboard resource',
    currentOwner: 'Promise and Suspense boundary model',
    futureBoundary: 'Framework-cached resource passed to use',
  },
]

export function SellerHubReact19BoundaryMap() {
  return (
    <section className="chapter14-panel" aria-labelledby="sellerhub-map-title">
      <p className="chapter14-kicker">9.13 SellerHub mapping</p>
      <h2 id="sellerhub-map-title">React 19 Actions and Compiler architecture map</h2>
      <div className="chapter14-grid">
        {sellerHubBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.scenario}>
            <h3>{boundary.scenario}</h3>
            <p>{boundary.currentOwner}</p>
            <p>{boundary.futureBoundary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
