const sellerHubMappings = [
  {
    scenario: 'Large catalog search',
    usefulApi: 'useDeferredValue',
    reason: 'The input value stays urgent while the expensive product list can lag.',
  },
  {
    scenario: 'Tab or filter switch',
    usefulApi: 'useTransition',
    reason: 'The selected control can update immediately while the derived workspace is non-urgent.',
  },
  {
    scenario: 'Browser inventory source',
    usefulApi: 'useSyncExternalStore',
    reason: 'React reads a stable snapshot and re-renders only after a subscription notification.',
  },
  {
    scenario: 'Accessible filter form',
    usefulApi: 'useId',
    reason: 'Labels and descriptions get collision-free IDs without using list keys.',
  },
  {
    scenario: 'Server cache policy',
    usefulApi: 'cache and cacheSignal',
    reason: 'Treat as framework/server design material, not Vite client business code.',
  },
]

export function SellerHubApiGapMap() {
  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">SellerHub API gap mapping</p>
      <h3>When these APIs are useful</h3>
      <table className="api-gap-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>API</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {sellerHubMappings.map((mapping) => (
            <tr key={mapping.scenario}>
              <td>{mapping.scenario}</td>
              <td>{mapping.usefulApi}</td>
              <td>{mapping.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
