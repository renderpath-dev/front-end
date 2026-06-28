const frameworkLayers = [
  {
    layer: 'React',
    owns: 'Component model, render tree, Server Component and Client Component semantics.',
    doesNotOwn: 'File-system routing, server deployment, request middleware, or metadata files.',
  },
  {
    layer: 'Next.js',
    owns: 'App Router conventions, route segments, server rendering, streaming, and build output.',
    doesNotOwn: 'The JavaScript language or the browser DOM APIs themselves.',
  },
  {
    layer: 'Browser',
    owns: 'DOM, events, storage, history, network APIs, and hydration target nodes.',
    doesNotOwn: 'Server-only data access or route segment matching before a request is rendered.',
  },
  {
    layer: 'TypeScript',
    owns: 'Compile-time relation checks for props, route models, and serializable data shapes.',
    doesNotOwn: 'Runtime validation for request data or hydration output equality.',
  },
]

export function FrameworkBoundaryMap() {
  return (
    <section className="chapter13-panel" aria-labelledby="framework-boundary-title">
      <p className="chapter13-kicker">Framework boundary</p>
      <h2 id="framework-boundary-title">Next.js is a React framework boundary</h2>
      <p>
        React Router maps client navigation to React elements. Next.js also owns server
        rendering, route files, server and client module graphs, streaming, metadata,
        and deployment runtime decisions.
      </p>
      <div className="chapter13-grid">
        {frameworkLayers.map((layer) => (
          <article className="chapter13-card" key={layer.layer}>
            <h3>{layer.layer}</h3>
            <dl>
              <dt>Owns</dt>
              <dd>{layer.owns}</dd>
              <dt>Does not own</dt>
              <dd>{layer.doesNotOwn}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
