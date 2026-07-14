import { useSyncExternalStore } from 'react'

type InventorySnapshot = {
  availableUnits: number
}

function createInventoryStore() {
  let snapshot: InventorySnapshot = { availableUnits: 42 }
  const listeners = new Set<() => void>()

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener)

      return () => listeners.delete(listener)
    },
    receiveExternalUpdate: () => {
      snapshot = { availableUnits: snapshot.availableUnits + 1 }
      listeners.forEach((listener) => listener())
    },
  }
}

const inventoryStore = createInventoryStore()

export function StateOwnerComparisonPanel() {
  const inventorySnapshot = useSyncExternalStore(
    inventoryStore.subscribe,
    inventoryStore.getSnapshot,
    inventoryStore.getSnapshot,
  )

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.16 owner comparison</p>
      <h3>External store vs React state vs URL state</h3>
      <button type="button" onClick={inventoryStore.receiveExternalUpdate}>
        Receive inventory update
      </button>
      <p role="status">External inventory units: {inventorySnapshot.availableUnits}</p>
      <table className="state-table">
        <tbody>
          <tr>
            <th scope="row">Dropdown open flag</th>
            <td>React local state</td>
          </tr>
          <tr>
            <th scope="row">Shareable catalog filter</th>
            <td>URL search params</td>
          </tr>
          <tr>
            <th scope="row">Inventory count</th>
            <td>External store or server boundary</td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}
