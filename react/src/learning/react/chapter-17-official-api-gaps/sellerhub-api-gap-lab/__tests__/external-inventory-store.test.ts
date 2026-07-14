import { describe, expect, it, beforeEach } from 'vitest'
import {
  getExternalInventorySnapshot,
  resetExternalInventoryStore,
  restockExternalInventoryItem,
  setExternalInventoryStock,
  subscribeExternalInventoryStore,
} from '../external-inventory-store'

describe('external inventory store', () => {
  beforeEach(() => {
    resetExternalInventoryStore()
  })

  it('returns a new snapshot only when inventory changes', () => {
    const initialSnapshot = getExternalInventorySnapshot()

    setExternalInventoryStock('missing-item', 99)
    expect(getExternalInventorySnapshot()).toBe(initialSnapshot)

    setExternalInventoryStock('inventory-light', 9)

    const nextSnapshot = getExternalInventorySnapshot()

    expect(nextSnapshot).not.toBe(initialSnapshot)
    expect(nextSnapshot.version).toBe(initialSnapshot.version + 1)
    expect(nextSnapshot.items.find((item) => item.id === 'inventory-light')?.stock).toBe(9)
  })

  it('notifies subscribers and stops after unsubscribe', () => {
    let notificationCount = 0
    const unsubscribe = subscribeExternalInventoryStore(() => {
      notificationCount += 1
    })

    restockExternalInventoryItem('inventory-light', 2)
    expect(notificationCount).toBe(1)

    unsubscribe()
    restockExternalInventoryItem('inventory-light', 2)

    expect(notificationCount).toBe(1)
  })
})
