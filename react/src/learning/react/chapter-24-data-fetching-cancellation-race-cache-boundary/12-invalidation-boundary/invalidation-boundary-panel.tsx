export function InvalidationBoundaryPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="invalidation-boundary-title">
      <p className="data-fetching-card__eyebrow">9.12</p>
      <h2 id="invalidation-boundary-title">Invalidation boundary after mutation</h2>
      <p>
        A mutation can make related cache entries stale. Targeted invalidation records
        which resource keys need refetching instead of clearing every request state.
      </p>
      <dl className="data-fetching-definition-grid">
        <div>
          <dt>Mutation</dt>
          <dd>Save order note</dd>
        </div>
        <div>
          <dt>Invalidate</dt>
          <dd>Orders list and order detail keys</dd>
        </div>
      </dl>
    </section>
  )
}
