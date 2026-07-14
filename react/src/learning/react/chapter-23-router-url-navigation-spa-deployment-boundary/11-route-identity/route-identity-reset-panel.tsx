import { useLocation } from 'react-router'

export function RouteIdentityResetPanel() {
  const location = useLocation()

  return (
    <section className="route-lab-card" aria-labelledby="route-identity-title">
      <p className="route-card-kicker">Part 11</p>
      <h2 id="route-identity-title">Route identity and state preservation</h2>
      <p>
        React preserves state when the same component identity remains in the same tree position.
        Route params can be used as stable keys when a form must reset for a different entity.
      </p>
      <ul className="route-list">
        <li>
          Location key: <code className="route-code">{location.key}</code>
        </li>
        <li>Layout state can survive child route changes.</li>
        <li>Entity forms should reset with a stable entity key, not with Date.now.</li>
      </ul>
    </section>
  )
}
