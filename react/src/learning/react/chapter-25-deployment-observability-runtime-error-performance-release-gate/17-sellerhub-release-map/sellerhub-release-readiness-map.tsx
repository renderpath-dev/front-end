const readinessMappings = [
  ['catalog route smoke', 'route chunk and visible heading evidence'],
  ['orders request failure', 'sanitized request diagnostic and retry path'],
  ['dashboard metric refetch', 'performance mark and status region evidence'],
  ['help dialog focus', 'keyboard and focus restore evidence'],
  ['runtime render error', 'Error Boundary fallback and component stack evidence'],
  ['feature flag disable path', 'documented fallback route and owner'],
]

export function SellerHubReleaseReadinessMap() {
  return (
    <section className="release-evidence-card" aria-labelledby="sellerhub-release-map-title">
      <p className="release-evidence-card__eyebrow">9.17</p>
      <h2 id="sellerhub-release-map-title">SellerHub release readiness mapping</h2>
      <p>
        SellerHub readiness maps each scenario to evidence, owner, runtime signal, privacy
        review, and release gate status.
      </p>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {readinessMappings.map(([scenario, evidence]) => (
            <tr key={scenario}>
              <td>{scenario}</td>
              <td>{evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
