const decisionRows = [
  {
    situation: 'Typed search drives a heavy product list',
    api: 'useDeferredValue',
    decision: 'Keep input urgent and let product results lag when needed.',
  },
  {
    situation: 'Route-like tab or filter update is non-urgent',
    api: 'useTransition',
    decision: 'Mark the content update as a transition and expose pending feedback.',
  },
  {
    situation: 'A mutable browser source owns inventory data',
    api: 'useSyncExternalStore',
    decision: 'Expose subscribe, getSnapshot, and server snapshot functions.',
  },
  {
    situation: 'Multiple form controls need linked help text',
    api: 'useId',
    decision: 'Generate accessibility IDs, but keep list keys data-derived.',
  },
  {
    situation: 'Runtime CSS rule must exist before layout measurement',
    api: 'useInsertionEffect',
    decision: 'Use only at CSS insertion boundaries, not as a generic effect replacement.',
  },
  {
    situation: 'Parent needs a small command surface',
    api: 'useImperativeHandle',
    decision: 'Expose methods instead of the entire DOM node.',
  },
  {
    situation: 'Effect subscription needs latest draft state',
    api: 'useEffectEvent',
    decision: 'Read latest values without expanding the subscription dependency list.',
  },
  {
    situation: 'Server cache or owner stack diagnostic',
    api: 'cache, cacheSignal, captureOwnerStack',
    decision: 'Document as boundary APIs and avoid client business-code use here.',
  },
]

export function ApiGapDecisionTable() {
  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · decision table</p>
      <h3>API gap decision table</h3>
      <table className="api-gap-table">
        <thead>
          <tr>
            <th>Situation</th>
            <th>API</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {decisionRows.map((row) => (
            <tr key={row.situation}>
              <td>{row.situation}</td>
              <td>{row.api}</td>
              <td>{row.decision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
