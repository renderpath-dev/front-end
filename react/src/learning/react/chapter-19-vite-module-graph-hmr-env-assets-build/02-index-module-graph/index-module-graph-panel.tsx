const moduleGraphEdges = [
  ['index.html', '/src/sudoku/main.tsx'],
  ['/src/sudoku/main.tsx', '/src/App.tsx'],
  ['/src/App.tsx', 'src/site/data/learning-manifest.ts'],
  ['learning manifest', 'chapter practice lazy imports'],
] as const

export function IndexModuleGraphPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.2 HTML entry</p>
      <h3>index.html and module graph</h3>
      <p>
        This project exposes the Vite entry directly: a module script in index.html
        starts the graph and Vite follows each static import from there.
      </p>
      <ol>
        {moduleGraphEdges.map(([from, to]) => (
          <li key={`${from}:${to}`}>
            <code>{from}</code> imports <code>{to}</code>
          </li>
        ))}
      </ol>
    </article>
  )
}
