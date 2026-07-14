import { sellerHubAccessibilityScenarios } from '../sellerhub-accessibility-interaction-lab/sellerhub-accessibility-data'

export function SellerHubAccessibilityMap() {
  return (
    <section className="a11y-card a11y-card-wide" aria-labelledby="sellerhub-a11y-map-title">
      <p className="a11y-card-kicker">9.16</p>
      <h3 id="sellerhub-a11y-map-title">SellerHub accessibility mapping</h3>
      <p>
        Accessibility review should map each feature to semantic output, keyboard behavior,
        focus behavior, live updates, and role/name test evidence.
      </p>
      <div className="a11y-table-scroll">
        <table>
          <caption>SellerHub accessibility scenario map</caption>
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Owner</th>
              <th scope="col">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {sellerHubAccessibilityScenarios.map((scenario) => (
              <tr key={scenario.scenario}>
                <th scope="row">{scenario.scenario}</th>
                <td>{scenario.owner}</td>
                <td>{scenario.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
