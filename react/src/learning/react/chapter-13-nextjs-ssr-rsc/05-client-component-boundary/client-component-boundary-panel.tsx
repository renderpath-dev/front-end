import { useMemo, useState } from 'react'

const moduleGraph = [
  {
    moduleName: 'app/catalog/page.tsx',
    environment: 'server',
    reason: 'Default App Router page module without a client directive.',
  },
  {
    moduleName: 'app/catalog/product-filter.tsx',
    environment: 'client',
    reason: 'The file starts with a client directive and owns interactive search state.',
  },
  {
    moduleName: 'app/catalog/filter-options.ts',
    environment: 'client',
    reason: 'It is a transitive dependency of the client entry module.',
  },
]

export function ClientComponentBoundaryPanel() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<'all' | 'server' | 'client'>(
    'all',
  )

  const visibleModules = useMemo(
    () =>
      moduleGraph.filter(
        (moduleItem) =>
          selectedEnvironment === 'all' || moduleItem.environment === selectedEnvironment,
      ),
    [selectedEnvironment],
  )

  return (
    <section className="chapter13-panel" aria-labelledby="client-boundary-title">
      <p className="chapter13-kicker">Client boundary</p>
      <h2 id="client-boundary-title">Client Components start at a module boundary</h2>
      <div className="chapter13-control-row" aria-label="Module graph filter">
        {(['all', 'server', 'client'] as const).map((environment) => (
          <button
            className={
              selectedEnvironment === environment
                ? 'chapter13-button chapter13-button-active'
                : 'chapter13-button'
            }
            key={environment}
            onClick={() => setSelectedEnvironment(environment)}
            type="button"
          >
            {environment}
          </button>
        ))}
      </div>
      <div className="chapter13-grid">
        {visibleModules.map((moduleItem) => (
          <article className="chapter13-card" key={moduleItem.moduleName}>
            <span className={`chapter13-pill chapter13-pill-${moduleItem.environment}`}>
              {moduleItem.environment}
            </span>
            <h3>{moduleItem.moduleName}</h3>
            <p>{moduleItem.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
