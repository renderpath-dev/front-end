import { matchRoutes, useLocation } from 'react-router'
import type { RouteObject } from 'react-router'

const learningRouteTree: RouteObject[] = [
  {
    path: '/',
    children: [
      { index: true },
      { path: 'catalog' },
      { path: 'catalog/:productId' },
      {
        path: 'seller',
        children: [{ index: true }, { path: 'orders' }],
      },
      { path: '*' },
    ],
  },
]

export function RouteMatchingTree() {
  const location = useLocation()
  const matches = matchRoutes(learningRouteTree, location)

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">02 / Route matching</p>
      <h2>Location selects one route branch</h2>
      <p>
        Current pathname: <code>{location.pathname}</code>
      </p>
      <ol className="routing-match-list">
        {matches?.map((match, index) => (
          <li key={`${match.pathname}-${index}`}>
            <code>{match.route.path ?? (match.route.index ? '(index)' : '(layout)')}</code>
            <span>{JSON.stringify(match.params)}</span>
          </li>
        )) ?? <li>No route branch matched.</li>}
      </ol>
    </article>
  )
}
