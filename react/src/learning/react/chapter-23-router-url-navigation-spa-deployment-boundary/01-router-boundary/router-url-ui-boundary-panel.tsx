import { useLocation, useNavigationType } from 'react-router'

export function RouterUrlUiBoundaryPanel() {
  const location = useLocation()
  const navigationType = useNavigationType()

  return (
    <section className="route-lab-card" aria-labelledby="router-boundary-title">
      <p className="route-card-kicker">Part 1</p>
      <h2 id="router-boundary-title">Router URL-to-UI boundary</h2>
      <p>
        The browser URL is the visible owner of the selected page. React Router reads the
        current location and renders the matching UI instead of hiding page selection in local
        component state.
      </p>
      <ul className="route-list">
        <li>
          Current pathname: <code className="route-code">{location.pathname}</code>
        </li>
        <li>
          Current search: <code className="route-code">{location.search || 'none'}</code>
        </li>
        <li>
          Navigation type: <code className="route-code">{navigationType}</code>
        </li>
      </ul>
    </section>
  )
}
