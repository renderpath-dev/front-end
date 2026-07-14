export function ProtectedRouteBoundaryPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="protected-route-title">
      <p className="route-card-kicker">Part 10</p>
      <h2 id="protected-route-title">Protected route UI boundary</h2>
      <p>
        A protected route can decide whether to render private UI or redirect to login. It is
        not real authorization because the browser cannot protect server data by hiding links.
      </p>
      <ul className="route-list">
        <li>Client auth state chooses the visible branch.</li>
        <li>Navigate can preserve a return path in location state.</li>
        <li>Server authorization must still validate every protected resource.</li>
      </ul>
    </section>
  )
}
