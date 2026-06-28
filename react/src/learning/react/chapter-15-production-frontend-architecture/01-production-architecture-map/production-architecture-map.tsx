type ArchitectureBoundary = {
  name: string
  owner: string
  input: string
  output: string
  gate: string
}

const architectureBoundaries: ArchitectureBoundary[] = [
  {
    name: 'Design system',
    owner: 'UI platform',
    input: 'tokens and accessibility contracts',
    output: 'primitive and compound components',
    gate: 'component API review',
  },
  {
    name: 'Feature module',
    owner: 'product squad',
    input: 'domain models and user intent',
    output: 'public feature API',
    gate: 'dependency direction check',
  },
  {
    name: 'API contract',
    owner: 'frontend and backend',
    input: 'unknown network response',
    output: 'validated domain model',
    gate: 'runtime validation and contract test',
  },
  {
    name: 'Release',
    owner: 'delivery team',
    input: 'build artifact and evidence',
    output: 'approved deployment candidate',
    gate: 'lint, typecheck, test, build, and review',
  },
]

export function ProductionArchitectureMap() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.1 Production architecture</p>
      <h2>Boundaries turn components into an engineering system</h2>
      <p>
        Each boundary names an owner, accepted input, published output, and evidence gate.
      </p>
      <div className="chapter15-grid">
        {architectureBoundaries.map((boundary) => (
          <article className="chapter15-card" key={boundary.name}>
            <h3>{boundary.name}</h3>
            <dl className="chapter15-definition-list">
              <div>
                <dt>Owner</dt>
                <dd>{boundary.owner}</dd>
              </div>
              <div>
                <dt>Input</dt>
                <dd>{boundary.input}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{boundary.output}</dd>
              </div>
              <div>
                <dt>Gate</dt>
                <dd>{boundary.gate}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
