const sellerHubMappings = [
  ['Learning navigation', 'Manifest imports create route-level module graph edges'],
  ['Seller dashboard metrics', 'Worker boundary keeps heavy calculation outside React state'],
  ['Markdown notes', 'import.meta.glob creates an analyzable content map'],
  ['Release path', 'base and SPA fallback must match the static host'],
  ['Config review', 'Alias and plugin changes need evidence before customization'],
] as const

export function SellerHubViteToolingMap() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.16 SellerHub map</p>
      <h3>SellerHub Vite tooling mapping</h3>
      <p>
        SellerHub features are React UI at runtime, but their loading, environment, asset,
        and build behavior is owned by the Vite tooling boundary.
      </p>
      <ul className="vite-boundary-list">
        {sellerHubMappings.map(([scenario, boundary]) => (
          <li key={scenario}>
            <strong>{scenario}</strong>
            <span>{boundary}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
