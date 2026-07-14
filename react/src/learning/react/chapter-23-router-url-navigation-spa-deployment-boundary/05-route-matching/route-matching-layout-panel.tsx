export function RouteMatchingLayoutPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="route-matching-title">
      <p className="route-card-kicker">Part 5</p>
      <h2 id="route-matching-title">Route matching, layout routes, Outlet, and index routes</h2>
      <p>
        A layout route owns the shared shell. Child routes own the page region rendered through
        Outlet. An index route chooses the default child for the parent URL.
      </p>
      <ul className="route-list">
        <li>
          <code className="route-code">/sellerhub</code> matches the shell and index redirect.
        </li>
        <li>
          <code className="route-code">catalog</code> is a child path, not a repeated full parent path.
        </li>
        <li>
          <code className="route-code">*</code> catches unknown children while preserving the shell.
        </li>
      </ul>
    </section>
  )
}
