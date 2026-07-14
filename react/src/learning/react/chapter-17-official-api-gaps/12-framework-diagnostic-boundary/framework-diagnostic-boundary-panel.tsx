const boundaryApis = [
  {
    name: 'cache',
    boundary: 'Server Component cache boundary',
    evidence: 'Not used as normal Vite client state because the official reference scopes it to server rendering work.',
  },
  {
    name: 'cacheSignal',
    boundary: 'Server Component abort boundary',
    evidence: 'Documented as a cache invalidation signal, not a browser subscription primitive.',
  },
  {
    name: 'captureOwnerStack',
    boundary: 'Development diagnostic boundary',
    evidence: 'Useful for owner stack diagnostics, but not a production UI data source.',
  },
]

export function FrameworkDiagnosticBoundaryPanel() {
  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Framework and diagnostic boundary</p>
      <h3>Server-only and diagnostic APIs</h3>
      <table className="api-gap-table">
        <thead>
          <tr>
            <th>API</th>
            <th>Boundary</th>
            <th>Practice treatment</th>
          </tr>
        </thead>
        <tbody>
          {boundaryApis.map((api) => (
            <tr key={api.name}>
              <td>{api.name}</td>
              <td>{api.boundary}</td>
              <td>{api.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
