const mismatchRows = [
  {
    cause: 'Date.now or Math.random during render',
    serverResult: 'One value is written into HTML',
    clientResult: 'A different value appears before hydration',
  },
  {
    cause: 'Browser-only reads during render',
    serverResult: 'No window or localStorage value exists',
    clientResult: 'Client render sees browser state',
  },
  {
    cause: 'Locale formatting differences',
    serverResult: 'Server locale formats text one way',
    clientResult: 'Browser locale formats text another way',
  },
]

export function HydrationMismatchReader() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.6 hydration mismatch</p>
      <h3>Read mismatch warnings as boundary evidence</h3>
      <p>
        Hydration expects server HTML and the first client render to describe the same
        content. A mismatch is a bug to investigate, not a style preference.
      </p>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Cause</th>
            <th>Server HTML</th>
            <th>Client render</th>
          </tr>
        </thead>
        <tbody>
          {mismatchRows.map((row) => (
            <tr key={row.cause}>
              <td>{row.cause}</td>
              <td>{row.serverResult}</td>
              <td>{row.clientResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
