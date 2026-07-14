import { moduleGraphNodes } from './sellerhub-vite-boundary-data'

export function ModuleGraphInspector() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Module graph inspector</h3>
      <p>
        The learning app starts from the visible HTML entry and reaches chapter practice
        roots through explicit imports and lazy route entries.
      </p>
      <ul className="vite-boundary-list">
        {moduleGraphNodes.map((node) => (
          <li key={node.edge}>
            <strong>{node.edge}</strong>
            <span>{node.owner}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
