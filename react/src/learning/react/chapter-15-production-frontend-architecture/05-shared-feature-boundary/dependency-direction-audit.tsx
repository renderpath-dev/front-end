type ModuleLayer = 'app' | 'feature' | 'shared'

type DependencyEdge = {
  from: string
  fromLayer: ModuleLayer
  to: string
  toLayer: ModuleLayer
}

const dependencyEdges: DependencyEdge[] = [
  {
    from: 'catalog-page',
    fromLayer: 'feature',
    to: 'currency-formatter',
    toLayer: 'shared',
  },
  {
    from: 'shared-button',
    fromLayer: 'shared',
    to: 'checkout-feature',
    toLayer: 'feature',
  },
  {
    from: 'application-shell',
    fromLayer: 'app',
    to: 'orders-feature',
    toLayer: 'feature',
  },
]

function isAllowedDependency(edge: DependencyEdge): boolean {
  if (edge.fromLayer === 'shared') {
    return edge.toLayer === 'shared'
  }

  if (edge.fromLayer === 'feature') {
    return edge.toLayer !== 'app'
  }

  return true
}

export function DependencyDirectionAudit() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.5 Shared and feature boundary</p>
      <h2>Dependency direction is a graph rule, not a folder preference</h2>
      <div className="chapter15-table" role="table" aria-label="Dependency direction audit">
        {dependencyEdges.map((edge) => {
          const allowed = isAllowedDependency(edge)

          return (
            <div className="chapter15-table-row" key={`${edge.from}-${edge.to}`} role="row">
              <code role="cell">{edge.from}</code>
              <span role="cell">imports</span>
              <code role="cell">{edge.to}</code>
              <strong className={allowed ? 'chapter15-pass' : 'chapter15-fail'} role="cell">
                {allowed ? 'allowed' : 'blocked'}
              </strong>
            </div>
          )
        })}
      </div>
    </section>
  )
}
