export function ClientHydrationBoundaryCard() {
  return (
    <section className="dom-boundary-card" aria-labelledby="client-hydration-boundary-title">
      <p className="dom-boundary-kicker">Root boundary</p>
      <h3 id="client-hydration-boundary-title">Client and hydration root boundary</h3>
      <p>
        This lab is a client-side Vite React lab. It uses client rendering and does not
        assume server-generated HTML exists for hydration.
      </p>
      <dl className="dom-boundary-definition-list">
        <div>
          <dt>Client root</dt>
          <dd>createRoot owns an empty browser DOM container.</dd>
        </div>
        <div>
          <dt>Hydration root</dt>
          <dd>hydrateRoot attaches React to matching server-generated HTML.</dd>
        </div>
      </dl>
    </section>
  )
}
