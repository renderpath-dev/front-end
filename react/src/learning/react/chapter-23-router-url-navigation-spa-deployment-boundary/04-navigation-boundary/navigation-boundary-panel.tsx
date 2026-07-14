import { Navigate, useLocation, useNavigate } from 'react-router'

export function NavigationBoundaryPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const shouldRedirect = new URLSearchParams(location.search).get('redirect') === 'overview'

  if (shouldRedirect) {
    return <Navigate replace to="/react/chapter-23?redirected=overview" />
  }

  return (
    <section className="route-lab-card" aria-labelledby="navigation-boundary-title">
      <p className="route-card-kicker">Part 4</p>
      <h2 id="navigation-boundary-title">useNavigate and Navigate boundaries</h2>
      <p>
        useNavigate belongs in event handlers and effects. Navigate belongs in a render branch
        that declares a redirect result.
      </p>
      <div className="route-button-row">
        <button type="button" onClick={() => navigate('/react/chapter-23?navigation=push')}>
          Push navigation
        </button>
        <button
          type="button"
          onClick={() => navigate('/react/chapter-23?navigation=replace', { replace: true })}
        >
          Replace navigation
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Back one entry
        </button>
      </div>
    </section>
  )
}
