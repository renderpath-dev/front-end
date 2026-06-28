const compilerBoundaryRows = [
  {
    topic: 'ProductCard',
    currentEvidence: 'Pure render and immutable product props',
    compilerMeaning: 'Candidate only; no compiler transform runs in this project',
  },
  {
    topic: 'OrderRow',
    currentEvidence: 'Keep measured manual memoization until migration tests pass',
    compilerMeaning: 'preserve-manual-memoization protects existing intent',
  },
  {
    topic: 'Dashboard resource',
    currentEvidence: 'Promise identity and Suspense boundary are modeled',
    compilerMeaning: 'Compiler does not create a cached data source',
  },
  {
    topic: 'Server Function',
    currentEvidence: 'Framework boundary is documented, not executed',
    compilerMeaning: 'Compiler does not create server transport',
  },
]

const compilerBailoutRows = [
  'Mutation of props or state',
  'Impure render values',
  'Dynamic component definitions',
  'Unsupported syntax',
  'Broken manual memoization dependencies',
]

export function SellerHubCompilerBoundaryMap() {
  return (
    <div className="chapter14-section-split">
      <article className="chapter14-card">
        <h3>Compiler candidate map</h3>
        <ul className="chapter14-list">
          {compilerBoundaryRows.map((row) => (
            <li key={row.topic}>
              <strong>{row.topic}</strong>
              <span>{row.currentEvidence}</span>
              <span>{row.compilerMeaning}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="chapter14-card">
        <h3>Bailout and lint signals</h3>
        <ul className="chapter14-list">
          {compilerBailoutRows.map((bailout) => (
            <li key={bailout}>{bailout}</li>
          ))}
        </ul>
        <p className="chapter14-note">
          Directives such as "use memo" and "use no memo" affect compiler analysis
          only when a compiler is configured.
        </p>
      </article>
      <article className="chapter14-card chapter14-card-wide">
        <h3>Migration order</h3>
        <ol className="chapter14-compact-list">
          <li>Pass Chapter 12 lint, typecheck, test, and build gates.</li>
          <li>Measure Chapter 11 render evidence before changing memoization.</li>
          <li>Adopt one Action boundary and verify pending, error, and rollback.</li>
          <li>Configure React Compiler only in a separate reviewed migration.</li>
        </ol>
      </article>
    </div>
  )
}
