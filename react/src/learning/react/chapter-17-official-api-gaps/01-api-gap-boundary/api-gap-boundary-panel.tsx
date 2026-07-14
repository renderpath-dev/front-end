const apiBoundaries = [
  {
    name: 'useDeferredValue',
    status: 'Runnable in this Vite client app',
    role: 'Keep an expensive view on a deferred value while urgent input updates stay responsive.',
  },
  {
    name: 'useTransition and startTransition',
    status: 'Runnable in this Vite client app',
    role: 'Mark non-urgent state updates and expose pending feedback for transition work.',
  },
  {
    name: 'useSyncExternalStore',
    status: 'Runnable in this Vite client app',
    role: 'Subscribe to an external mutable source through a stable snapshot contract.',
  },
  {
    name: 'cache, cacheSignal, captureOwnerStack',
    status: 'Boundary only in this chapter',
    role: 'Explain server-only cache semantics and development diagnostics without pretending they are normal client state APIs.',
  },
]

export function ApiGapBoundaryPanel() {
  return (
    <div className="api-gap-grid">
      {apiBoundaries.map((boundary) => (
        <article className="api-gap-card" key={boundary.name}>
          <p className="api-gap-kicker">{boundary.status}</p>
          <h3>{boundary.name}</h3>
          <p>{boundary.role}</p>
        </article>
      ))}
    </div>
  )
}
