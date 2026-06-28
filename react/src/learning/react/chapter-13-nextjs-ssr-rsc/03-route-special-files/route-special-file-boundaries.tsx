const routeSpecialFiles = [
  {
    fileName: 'layout.tsx',
    boundary: 'Shared shell',
    trigger: 'Matched before child page output.',
    sellerHubUse: 'Seller navigation, seller account shell, and nested child segment.',
  },
  {
    fileName: 'page.tsx',
    boundary: 'Route leaf UI',
    trigger: 'Matched when URL resolves to a segment leaf.',
    sellerHubUse: 'Catalog page, product detail page, checkout page, and login page.',
  },
  {
    fileName: 'loading.tsx',
    boundary: 'Pending UI',
    trigger: 'Shown while route segment content streams in.',
    sellerHubUse: 'Catalog skeleton and seller order loading view.',
  },
  {
    fileName: 'error.tsx',
    boundary: 'Unexpected segment error fallback',
    trigger: 'Rendered after a route segment throws during rendering.',
    sellerHubUse: 'Seller order fallback with retry affordance.',
  },
  {
    fileName: 'not-found.tsx',
    boundary: 'Route-level not found UI',
    trigger: 'Rendered when route code raises a not-found condition.',
    sellerHubUse: 'Missing product detail or unknown route branch.',
  },
]

export function RouteSpecialFileBoundaries() {
  return (
    <section className="chapter13-panel" aria-labelledby="special-files-title">
      <p className="chapter13-kicker">Special files</p>
      <h2 id="special-files-title">Fixed file names express route boundaries</h2>
      <div className="chapter13-grid">
        {routeSpecialFiles.map((routeFile) => (
          <article className="chapter13-card" key={routeFile.fileName}>
            <h3>{routeFile.fileName}</h3>
            <p>{routeFile.boundary}</p>
            <dl>
              <dt>Trigger</dt>
              <dd>{routeFile.trigger}</dd>
              <dt>SellerHub</dt>
              <dd>{routeFile.sellerHubUse}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
