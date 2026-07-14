import { legacyApiGuidance } from './sellerhub-dom-boundary-data'

export function LegacyApiReadingPanel() {
  return (
    <section className="dom-boundary-card" aria-labelledby="legacy-api-reading-title">
      <p className="dom-boundary-kicker">Legacy reading</p>
      <h3 id="legacy-api-reading-title">Legacy API reading panel</h3>
      <p>
        Legacy APIs are shown for source reading, migration judgment, and library boundary
        review. They are not preferred new-code patterns.
      </p>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>API</th>
            <th>Read for</th>
            <th>Modern preference</th>
            <th>Keep when</th>
          </tr>
        </thead>
        <tbody>
          {legacyApiGuidance.map((item) => (
            <tr key={item.api}>
              <td>{item.api}</td>
              <td>{item.readFor}</td>
              <td>{item.modernPreference}</td>
              <td>{item.keepWhen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
