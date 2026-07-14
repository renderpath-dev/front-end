import { removedApiMigrations } from '../sellerhub-dom-boundary-lab/sellerhub-dom-boundary-data'

export function RemovedDomApiMigrationPanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.10 removed APIs</p>
      <h3>React 19 removed DOM APIs and replacements</h3>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Removed API</th>
            <th>Modern replacement</th>
            <th>Boundary</th>
          </tr>
        </thead>
        <tbody>
          {removedApiMigrations.map((migration) => (
            <tr key={migration.legacyApi}>
              <td>{migration.legacyApi}</td>
              <td>{migration.replacement}</td>
              <td>{migration.boundary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
