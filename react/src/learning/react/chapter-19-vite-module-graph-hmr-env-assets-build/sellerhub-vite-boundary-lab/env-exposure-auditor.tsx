import { auditEnvEntries } from '../06-env-modes/env-mode-model'
import { envAuditEntries } from './sellerhub-vite-boundary-data'

type EnvExposureAuditorProps = {
  entries?: typeof envAuditEntries
}

export function EnvExposureAuditor({ entries = envAuditEntries }: EnvExposureAuditorProps) {
  const auditedEntries = auditEnvEntries(entries)

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Env exposure auditor</h3>
      <p>
        Public client value means the key can enter the browser bundle. Private server-only
        value means it must stay outside Vite client source.
      </p>
      <table className="vite-boundary-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Boundary</th>
            <th>Guidance</th>
          </tr>
        </thead>
        <tbody>
          {auditedEntries.map((entry) => (
            <tr key={entry.key}>
              <td>{entry.key}</td>
              <td>
                {entry.exposure === 'client-exposed'
                  ? 'Public client value'
                  : 'Private server-only value'}
              </td>
              <td>
                {entry.safeForClientBundle
                  ? entry.purpose
                  : 'Do not put secrets or private tokens in VITE_ variables.'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
