export function DomOwnerTreePanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.1 DOM boundary</p>
      <h3>React owner tree vs browser DOM tree</h3>
      <p>
        React owns component relationships and event ownership. The browser owns DOM
        containers, nodes, layout, focus, and paint.
      </p>
      <div className="dom-boundary-two-column">
        <div>
          <strong>React owner tree</strong>
          <ul>
            <li>Component parent-child ownership</li>
            <li>Context and event propagation</li>
            <li>Render snapshots and updates</li>
          </ul>
        </div>
        <div>
          <strong>Browser DOM tree</strong>
          <ul>
            <li>Physical node placement</li>
            <li>Document containers and focus</li>
            <li>Layout, paint, and resource loading</li>
          </ul>
        </div>
      </div>
    </article>
  )
}
