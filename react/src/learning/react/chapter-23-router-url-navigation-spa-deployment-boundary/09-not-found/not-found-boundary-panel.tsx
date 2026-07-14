export function NotFoundBoundaryPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="not-found-title">
      <p className="route-card-kicker">Part 9</p>
      <h2 id="not-found-title">Not found and catch-all route boundaries</h2>
      <p>
        A catch-all route should preserve the app shell, explain the unknown path, and offer a
        recovery link. It should not silently redirect every unknown URL to home.
      </p>
      <ul className="route-list">
        <li>Unknown pathname: route not found boundary.</li>
        <li>Valid route with invalid id: entity not found boundary.</li>
        <li>Static host 404: deployment rewrite boundary.</li>
      </ul>
    </section>
  )
}
