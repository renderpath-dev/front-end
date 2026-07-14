const buildReviewRows = [
  ['vite build', 'Creates dist output from the HTML entry and module graph'],
  ['vite preview', 'Serves dist locally for review, not production hosting'],
  ['base', 'Rewrites built asset URLs for nested deployment paths'],
  ['SPA fallback', 'Static host must route deep links back to index.html'],
] as const

export function BuildPreviewBasePathPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.14 build</p>
      <h3>Build, preview, base path, and static deployment</h3>
      <p>
        Build success proves the project can emit optimized static assets. It does not
        prove CDN headers, SPA fallback rules, or a production deployment.
      </p>
      <table className="vite-boundary-table">
        <thead>
          <tr>
            <th>Review item</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {buildReviewRows.map(([item, meaning]) => (
            <tr key={item}>
              <td>{item}</td>
              <td>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
