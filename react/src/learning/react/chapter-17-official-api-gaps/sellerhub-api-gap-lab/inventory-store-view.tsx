import { useSyncExternalStore } from 'react'
import {
  getExternalInventoryServerSnapshot,
  getExternalInventorySnapshot,
  restockExternalInventoryItem,
  subscribeExternalInventoryStore,
} from './external-inventory-store'

export function InventoryStoreView() {
  const snapshot = useSyncExternalStore(
    subscribeExternalInventoryStore,
    getExternalInventorySnapshot,
    getExternalInventoryServerSnapshot,
  )

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useSyncExternalStore</p>
      <h3>Inventory store view</h3>
      <div className="api-gap-pill-row">
        <span className="api-gap-pill">Snapshot version {snapshot.version}</span>
        <span className="api-gap-pill">
          Total stock {snapshot.items.reduce((total, item) => total + item.stock, 0)}
        </span>
      </div>
      <ul className="api-gap-list" aria-label="Inventory store rows">
        {snapshot.items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <br />
            <span className={item.stock < 8 ? 'sellerhub-gap-stock-low' : 'sellerhub-gap-stock-ready'}>
              {item.sku} · stock {item.stock}
            </span>
            <div className="api-gap-button-row">
              <button
                className="api-gap-button api-gap-button-secondary"
                onClick={() => restockExternalInventoryItem(item.id, 2)}
                type="button"
              >
                Restock two
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}
