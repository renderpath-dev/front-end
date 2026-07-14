const noteModules = import.meta.glob('../11-import-meta-glob/content/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function getTitle(markdown: string): string {
  return markdown.split('\n')[0]?.replace(/^#\s+/, '') ?? 'Untitled note'
}

export function GlobContentReader() {
  const entries = Object.entries(noteModules).map(([path, markdown]) => ({
    body: markdown,
    path,
    title: getTitle(markdown),
  }))

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Glob content reader</h3>
      <p>
        Vite turns the literal glob into a module map before the browser runs this
        component.
      </p>
      <ul className="vite-boundary-list">
        {entries.map((entry) => (
          <li key={entry.path}>
            <strong>{entry.title}</strong>
            <span>{entry.body.split('\n').slice(2, 3).join(' ')}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
