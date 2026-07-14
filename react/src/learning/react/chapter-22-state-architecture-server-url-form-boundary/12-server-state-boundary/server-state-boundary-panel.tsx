import { sellerHubOrders } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'

export function ServerStateBoundaryPanel() {
  const cacheKey = 'orders:seller-42:open'

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.12 remote owner</p>
      <h3>Server state boundary</h3>
      <p>
        Orders are displayed as a client snapshot, but the remote orders source remains the owner of
        confirmed data.
      </p>
      <p>
        Cache key concept: <code>{cacheKey}</code>
      </p>
      <p>Client snapshot rows: {sellerHubOrders.length}</p>
    </article>
  )
}
