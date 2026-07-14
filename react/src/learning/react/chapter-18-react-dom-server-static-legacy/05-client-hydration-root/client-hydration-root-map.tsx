export function ClientHydrationRootMap() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.5 client root</p>
      <h3>createRoot vs hydrateRoot</h3>
      <dl className="dom-boundary-definition-list">
        <div>
          <dt>createRoot</dt>
          <dd>Use when the browser DOM container is empty or client-rendered from scratch.</dd>
        </div>
        <div>
          <dt>hydrateRoot</dt>
          <dd>Use when matching React HTML already exists from server or build output.</dd>
        </div>
        <div>
          <dt>Current lab</dt>
          <dd>The Vite page is a client-side lab, so the app entry uses a client root.</dd>
        </div>
      </dl>
    </article>
  )
}
