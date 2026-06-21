import { matchRoutes } from 'react-router'
import type { RouteObject } from 'react-router'
import { useState } from 'react'

const fallbackRouteTree: RouteObject[] = [
  { path: '/catalog' },
  { path: '/catalog/:productId' },
  { path: '*' },
]

export function NotFoundFallbackRoute() {
  const [candidatePath, setCandidatePath] = useState('/unknown/path')
  const matches = matchRoutes(fallbackRouteTree, candidatePath)
  const leafPath = matches?.at(-1)?.route.path ?? 'no match'

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">09 / Fallback matching</p>
      <h2>A splat route handles unmatched locations</h2>
      <label className="routing-field">
        <span>Candidate pathname</span>
        <input
          onChange={(event) => setCandidatePath(event.currentTarget.value)}
          value={candidatePath}
        />
      </label>
      <p>
        Leaf match: <code>{leafPath}</code>
      </p>
      <p className="routing-practice-note">
        Remove the star route and unknown paths produce no route element instead of a useful
        fallback screen.
      </p>
    </article>
  )
}
