import {
  auditEnvEntries,
  parseViteBoolean,
  readCurrentViteEnv,
} from './env-mode-model'

const exampleEnvEntries = auditEnvEntries([
  {
    exampleValue: 'https://api.example.test',
    key: 'VITE_PUBLIC_API_BASE',
    purpose: 'Client bundle can select a public API origin.',
  },
  {
    exampleValue: 'not bundled',
    key: 'DATABASE_PASSWORD',
    purpose: 'Server-only secret must stay outside the client bundle.',
  },
  {
    exampleValue: 'true',
    key: 'VITE_ENABLE_METRIC_WORKER',
    purpose: 'Feature flag arrives as a string and must be parsed.',
  },
])

export function EnvBoundaryPanel() {
  const snapshot = readCurrentViteEnv()
  const parsedFeatureFlag = parseViteBoolean('true')

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.6 import.meta.env</p>
      <h3>Env, modes, and VITE_ exposure</h3>
      <p>
        Vite replaces built-in import.meta.env constants and exposes only prefixed
        variables to client code. A VITE_ value is public bundle data, not a secret.
      </p>
      <ul>
        <li>MODE: {snapshot.mode}</li>
        <li>BASE_URL: {snapshot.baseUrl}</li>
        <li>DEV: {String(snapshot.dev)}</li>
        <li>PROD: {String(snapshot.prod)}</li>
        <li>SSR: {String(snapshot.ssr)}</li>
        <li>Parsed feature flag example: {String(parsedFeatureFlag)}</li>
      </ul>
      <table className="vite-boundary-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Exposure</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {exampleEnvEntries.map((entry) => (
            <tr key={entry.key}>
              <td>{entry.key}</td>
              <td>{entry.exposure}</td>
              <td>{entry.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
