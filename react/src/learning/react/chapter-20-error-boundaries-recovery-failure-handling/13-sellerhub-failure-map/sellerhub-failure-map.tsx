type SellerHubFailureScenario = {
  scenario: string
  boundary: string
  recovery: string
}

const sellerHubFailureScenarios: SellerHubFailureScenario[] = [
  {
    scenario: 'Catalog card render crash',
    boundary: 'Widget boundary',
    recovery: 'Replace the card and reset after invalid listing data is removed',
  },
  {
    scenario: 'Orders fetch failure',
    boundary: 'Async request owner',
    recovery: 'Show request retry UI without claiming boundary capture',
  },
  {
    scenario: 'Dashboard chart plugin crash',
    boundary: 'Widget boundary',
    recovery: 'Replace only the chart card',
  },
  {
    scenario: 'Permission panel crash',
    boundary: 'Route section boundary',
    recovery: 'Keep route shell and support navigation away',
  },
  {
    scenario: 'Lazy route chunk failure',
    boundary: 'Route Error Boundary around Suspense',
    recovery: 'Show chunk failure fallback and offer route retry',
  },
  {
    scenario: 'Notification toast failure',
    boundary: 'Optional widget boundary',
    recovery: 'Drop failed toast while app shell remains usable',
  },
  {
    scenario: 'Settings form validation',
    boundary: 'Form state owner',
    recovery: 'Show validation errors, not an Error Boundary fallback',
  },
  {
    scenario: 'Audit log widget failure',
    boundary: 'Widget boundary',
    recovery: 'Show local fallback and preserve dashboard',
  },
  {
    scenario: 'Route shell failure',
    boundary: 'Parent application boundary',
    recovery: 'Show broad fallback because the shell itself failed',
  },
]

export function SellerHubFailureMap() {
  return (
    <section className="recovery-card recovery-card-wide" aria-labelledby="sellerhub-map-title">
      <p className="recovery-card-kicker">9.13</p>
      <h3 id="sellerhub-map-title">SellerHub failure mapping</h3>
      <p>
        Boundary placement is an architecture decision. The same error mechanism produces
        different recovery UX depending on owner, blast radius, and retry path.
      </p>
      <div className="recovery-table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Boundary</th>
              <th scope="col">Recovery</th>
            </tr>
          </thead>
          <tbody>
            {sellerHubFailureScenarios.map((scenario) => (
              <tr key={scenario.scenario}>
                <td>{scenario.scenario}</td>
                <td>{scenario.boundary}</td>
                <td>{scenario.recovery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <article className="recovery-code-card">
        <h4>Review note</h4>
        <p>
          Put the boundary at the smallest UI segment that can fail independently and
          recover without hiding a systemic failure.
        </p>
      </article>
    </section>
  )
}
