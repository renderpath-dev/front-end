import { removedApiMigrations } from './sellerhub-dom-boundary-data'

export function RemovedApiMigrationTable() {
  return (
    <section className="dom-boundary-card" aria-labelledby="removed-api-migration-title">
      <p className="dom-boundary-kicker">Removed APIs</p>
      <h3 id="removed-api-migration-title">Removed API migration table</h3>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Legacy API</th>
            <th>Replacement</th>
            <th>Guidance</th>
          </tr>
        </thead>
        <tbody>
          {removedApiMigrations.map((migration) => (
            <tr key={migration.legacyApi}>
              <td>{migration.legacyApi}</td>
              <td>{migration.replacement}</td>
              <td>{migration.guidance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
