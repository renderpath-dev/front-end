const runtimeBoundaries = [
  {
    boundary: 'Route Handler',
    fileName: 'app/api/orders/route.ts',
    functionName: 'GET(request: Request)',
    runtime: 'Node or Edge, depending on route config and deployment adapter.',
    sellerHubRisk: 'It returns API data. It is not a React component.',
  },
  {
    boundary: 'Proxy',
    fileName: 'proxy.ts',
    functionName: 'proxy(request: NextRequest)',
    runtime: 'Runs before route rendering. Next.js 16 renamed Middleware to Proxy.',
    sellerHubRisk: 'Use it for redirects, not for complete authorization.',
  },
  {
    boundary: 'Metadata',
    fileName: 'app/catalog/[productId]/page.tsx',
    functionName: 'generateMetadata({ params })',
    runtime: 'Server render metadata boundary.',
    sellerHubRisk: 'It changes head data. It does not manage client state.',
  },
  {
    boundary: 'Runtime config',
    fileName: 'page.tsx or route.ts',
    functionName: "export const runtime = 'edge'",
    runtime: 'Edge has a smaller API surface than Node.',
    sellerHubRisk: 'Avoid Node-only libraries when a segment targets Edge.',
  },
]

export function RouteRuntimeBoundaryMap() {
  return (
    <section className="chapter13-panel" aria-labelledby="route-runtime-title">
      <p className="chapter13-kicker">Route runtime</p>
      <h2 id="route-runtime-title">Route Handlers, Proxy, Metadata, and runtime config are not UI state</h2>
      <div className="chapter13-grid">
        {runtimeBoundaries.map((boundary) => (
          <article className="chapter13-card" key={boundary.boundary}>
            <h3>{boundary.boundary}</h3>
            <dl>
              <dt>File</dt>
              <dd>{boundary.fileName}</dd>
              <dt>Signature</dt>
              <dd>{boundary.functionName}</dd>
              <dt>Runtime</dt>
              <dd>{boundary.runtime}</dd>
              <dt>Risk</dt>
              <dd>{boundary.sellerHubRisk}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
