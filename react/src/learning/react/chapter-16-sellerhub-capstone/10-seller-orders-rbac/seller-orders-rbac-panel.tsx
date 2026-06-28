import { canUpdateOrderStatus } from '../sellerhub-capstone-app/shared/flags/feature-flags'
import type { SellerHubRole } from '../sellerhub-capstone-app/shared/flags/feature-flags'

const roles: SellerHubRole[] = ['buyer', 'seller', 'viewer']
const flags = { sellerOrderMutation: true, operationsPanel: true }

export function SellerOrdersRbacPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="seller-orders-rbac-title">
      <p className="chapter16-eyebrow">9.10 Seller orders and RBAC</p>
      <h2 id="seller-orders-rbac-title">
        Combine permission, release flag, optimistic projection, and rollback
      </h2>
      <ul className="chapter16-list">
        {roles.map((role) => (
          <li key={role}>
            {role}: {canUpdateOrderStatus(role, flags) ? 'mutation enabled' : 'read only'}
          </li>
        ))}
      </ul>
    </section>
  )
}
