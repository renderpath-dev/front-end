export type ExternalInventoryItem = {
  id: string
  sku: string
  name: string
  stock: number
  updatedAt: number
}

export type ExternalInventorySnapshot = {
  version: number
  items: ExternalInventoryItem[]
}

const initialItems: ExternalInventoryItem[] = [
  { id: 'inventory-stand', sku: 'STAND-17', name: 'Adjustable Laptop Stand', stock: 18, updatedAt: 1 },
  { id: 'inventory-light', sku: 'LIGHT-17', name: 'Studio Light Kit', stock: 7, updatedAt: 1 },
  { id: 'inventory-scale', sku: 'SCALE-17', name: 'Parcel Weight Scale', stock: 4, updatedAt: 1 },
]

const initialSnapshot: ExternalInventorySnapshot = {
  version: 1,
  items: initialItems,
}

let currentSnapshot = initialSnapshot
const listeners = new Set<() => void>()

export function subscribeExternalInventoryStore(listener: () => void): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function getExternalInventorySnapshot(): ExternalInventorySnapshot {
  return currentSnapshot
}

export function getExternalInventoryServerSnapshot(): ExternalInventorySnapshot {
  return initialSnapshot
}

export function setExternalInventoryStock(itemId: string, nextStock: number): void {
  let changed = false
  const nextItems = currentSnapshot.items.map((item) => {
    if (item.id !== itemId || item.stock === nextStock) {
      return item
    }

    changed = true

    return {
      ...item,
      stock: nextStock,
      updatedAt: item.updatedAt + 1,
    }
  })

  if (!changed) {
    return
  }

  currentSnapshot = {
    version: currentSnapshot.version + 1,
    items: nextItems,
  }

  emitInventoryChange()
}

export function restockExternalInventoryItem(itemId: string, amount: number): void {
  const item = currentSnapshot.items.find((candidate) => candidate.id === itemId)

  if (!item) {
    return
  }

  setExternalInventoryStock(itemId, item.stock + amount)
}

export function resetExternalInventoryStore(): void {
  currentSnapshot = initialSnapshot
  emitInventoryChange()
}

function emitInventoryChange() {
  listeners.forEach((listener) => listener())
}
