const configReviewRows = [
  ['defineConfig', 'Type helper for tooling config, not browser runtime code'],
  ['resolve.alias', 'Import resolution rule that should use absolute file-system targets'],
  ['@vitejs/plugin-react', 'React transform and Fast Refresh integration boundary'],
  ['plugin hooks', 'Tooling lifecycle hooks such as transform or configureServer'],
] as const

export function ViteConfigPluginBoundaryPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.13 config</p>
      <h3>vite.config.ts and plugin boundary</h3>
      <p>
        The config file is executed by tooling before the browser receives modules. This
        chapter reads config concepts without publishing a custom production plugin.
      </p>
      <table className="vite-boundary-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Boundary</th>
          </tr>
        </thead>
        <tbody>
          {configReviewRows.map(([item, boundary]) => (
            <tr key={item}>
              <td>{item}</td>
              <td>{boundary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
