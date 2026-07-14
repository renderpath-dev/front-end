export function ServerRenderingBoundaryPanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.7 blocking server APIs</p>
      <h3>renderToString and renderToStaticMarkup boundary</h3>
      <p>
        Blocking server APIs produce HTML strings in a server runtime. This Vite client lab
        documents the decision boundary instead of executing server rendering in the browser.
      </p>
      <ul className="dom-boundary-list">
        <li>
          <strong>renderToString</strong>
          <span>Interactive HTML still needs hydrateRoot on the client.</span>
        </li>
        <li>
          <strong>renderToStaticMarkup</strong>
          <span>Non-interactive static HTML cannot be hydrated.</span>
        </li>
      </ul>
    </article>
  )
}
