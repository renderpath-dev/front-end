export function HashRouterBoundaryPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="hash-router-title">
      <p className="route-card-kicker">Part 15</p>
      <h2 id="hash-router-title">HashRouter boundary and tradeoffs</h2>
      <p>
        Hash routing keeps the app route after #, so the static host receives only the path
        before the fragment. It can work around missing rewrites, but it changes URL design.
      </p>
      <ul className="route-list">
        <li>
          BrowserRouter example: <code className="route-code">/sellerhub/orders</code>
        </li>
        <li>
          HashRouter example: <code className="route-code">/#/sellerhub/orders</code>
        </li>
        <li>Use it as a deployment workaround, not as a way to avoid URL design review.</li>
      </ul>
    </section>
  )
}
