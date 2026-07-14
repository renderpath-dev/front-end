export function DataFetchingBoundaryPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="data-fetching-boundary-title">
      <p className="data-fetching-card__eyebrow">9.1</p>
      <h2 id="data-fetching-boundary-title">Data fetching boundary</h2>
      <p>
        Client data fetching synchronizes React UI with an external system. Render can
        describe the requested UI, but the request process needs an event, an effect,
        or a custom hook boundary.
      </p>
      <dl className="data-fetching-definition-grid">
        <div>
          <dt>Owner</dt>
          <dd>Request criteria and lifecycle state</dd>
        </div>
        <div>
          <dt>Not owner</dt>
          <dd>Server-confirmed authority or production cache</dd>
        </div>
      </dl>
    </section>
  )
}
