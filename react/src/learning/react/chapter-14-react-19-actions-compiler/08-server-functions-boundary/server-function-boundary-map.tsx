const serverFunctionBoundaries = [
  {
    step: 'Define',
    frameworkOwner: 'A framework transforms a function marked with "use server".',
    viteReality: 'No Server Function transform is configured.',
  },
  {
    step: 'Reference',
    frameworkOwner: 'The client receives a serializable server reference.',
    viteReality: 'A local async function remains ordinary browser JavaScript.',
  },
  {
    step: 'Invoke',
    frameworkOwner: 'The framework sends serialized arguments to the server runtime.',
    viteReality: 'No generated network request or server execution exists.',
  },
  {
    step: 'Return',
    frameworkOwner: 'The framework serializes the result back to React.',
    viteReality: 'The lab only renders this architecture map.',
  },
]

export function ServerFunctionBoundaryMap() {
  return (
    <section className="chapter14-panel" aria-labelledby="server-function-title">
      <p className="chapter14-kicker">9.8 Server Functions</p>
      <h2 id="server-function-title">Framework-owned server execution</h2>
      <div className="chapter14-grid">
        {serverFunctionBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.step}>
            <span className="chapter14-pill">{boundary.step}</span>
            <h3>{boundary.frameworkOwner}</h3>
            <p>{boundary.viteReality}</p>
          </article>
        ))}
      </div>
      <p className="chapter14-note">
        Server Functions are stable React features, but implementing their transport and
        bundler integration belongs to a framework. This Vite lab does not fake that runtime.
      </p>
    </section>
  )
}
