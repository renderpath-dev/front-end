const prebundleBoundaries = [
  {
    label: 'Bare dependency import',
    reason: 'Vite discovers imports that resolve from node_modules.',
  },
  {
    label: 'CommonJS or UMD package',
    reason: 'Development needs an ESM-compatible browser request.',
  },
  {
    label: 'Many internal ESM files',
    reason: 'Pre-bundling reduces the request waterfall for dependencies.',
  },
  {
    label: 'Application source file',
    reason: 'Source remains transformed on demand instead of dependency optimized.',
  },
] as const

export function DependencyPrebundlingPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.4 optimize deps</p>
      <h3>Dependency pre-bundling</h3>
      <p>
        Pre-bundling is a development dependency boundary. It is not a production
        performance proof and it should not be tuned until a dependency discovery problem
        is visible.
      </p>
      <ul className="vite-boundary-list">
        {prebundleBoundaries.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.reason}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
