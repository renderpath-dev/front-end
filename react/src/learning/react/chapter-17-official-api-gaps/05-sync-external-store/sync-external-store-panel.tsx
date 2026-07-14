import { useSyncExternalStore } from 'react'
import {
  getBrowserInventoryServerSnapshot,
  getBrowserInventorySnapshot,
  restockBrowserInventoryItem,
  subscribeBrowserInventoryStore,
} from './browser-inventory-store'

export function SyncExternalStorePanel() {
  const inventorySnapshot = useSyncExternalStore(
    subscribeBrowserInventoryStore,
    getBrowserInventorySnapshot,
    getBrowserInventoryServerSnapshot,
  )

  const totalStock = inventorySnapshot.items.reduce((total, item) => total + item.stock, 0)

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useSyncExternalStore</p>
      <h3>External inventory store</h3>
      <div className="api-gap-metric-row">
        <div className="api-gap-metric">
          <span>Snapshot version</span>
          <strong>{inventorySnapshot.version}</strong>
        </div>
        <div className="api-gap-metric">
          <span>Total stock</span>
          <strong>{totalStock}</strong>
        </div>
      </div>
      <ul className="api-gap-list" aria-label="External inventory rows">
        {inventorySnapshot.items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <br />
            <span>
              {item.sku} · stock {item.stock} · revision {item.updatedAt}
            </span>
            <div className="api-gap-button-row">
              <button
                className="api-gap-button api-gap-button-secondary"
                onClick={() => restockBrowserInventoryItem(item.id, 1)}
                type="button"
              >
                Restock one
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}
