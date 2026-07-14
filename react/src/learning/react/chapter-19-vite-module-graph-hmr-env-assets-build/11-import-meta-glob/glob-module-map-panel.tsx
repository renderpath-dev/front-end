const contentModules = import.meta.glob('./content/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function extractTitle(markdown: string): string {
  return markdown.split('\n')[0]?.replace(/^#\s+/, '') ?? 'Untitled note'
}

export function GlobModuleMapPanel() {
  const entries = Object.entries(contentModules).map(([path, markdown]) => ({
    path,
    title: extractTitle(markdown),
  }))

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.11 glob transform</p>
      <h3>import.meta.glob module map</h3>
      <p>
        The glob call is a Vite compile-time transform. The browser receives a module map,
        not permissions to scan the local filesystem.
      </p>
      <ul className="vite-boundary-list">
        {entries.map((entry) => (
          <li key={entry.path}>
            <strong>{entry.title}</strong>
            <code>{entry.path}</code>
          </li>
        ))}
      </ul>
    </article>
  )
}
