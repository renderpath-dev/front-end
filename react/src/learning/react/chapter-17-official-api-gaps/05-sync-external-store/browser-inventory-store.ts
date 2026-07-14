export type BrowserInventoryItem = {
  id: string
  sku: string
  name: string
  stock: number
  updatedAt: number
}

export type BrowserInventorySnapshot = {
  version: number
  items: BrowserInventoryItem[]
}

const initialInventoryItems: BrowserInventoryItem[] = [
  { id: 'inv-stand', sku: 'STAND-001', name: 'Adjustable laptop stand', stock: 18, updatedAt: 1 },
  { id: 'inv-light', sku: 'LIGHT-002', name: 'Studio key light', stock: 7, updatedAt: 1 },
  { id: 'inv-scale', sku: 'SCALE-003', name: 'Parcel weight scale', stock: 11, updatedAt: 1 },
]

const initialSnapshot: BrowserInventorySnapshot = {
  version: 1,
  items: initialInventoryItems,
}

let currentSnapshot = initialSnapshot
const listeners = new Set<() => void>()

export function subscribeBrowserInventoryStore(listener: () => void): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function getBrowserInventorySnapshot(): BrowserInventorySnapshot {
  return currentSnapshot
}

export function getBrowserInventoryServerSnapshot(): BrowserInventorySnapshot {
  return initialSnapshot
}

export function updateBrowserInventoryStock(itemId: string, nextStock: number): void {
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

  emitBrowserInventoryChange()
}

export function restockBrowserInventoryItem(itemId: string, amount: number): void {
  const item = currentSnapshot.items.find((candidate) => candidate.id === itemId)

  if (!item) {
    return
  }

  updateBrowserInventoryStock(itemId, item.stock + amount)
}

export function resetBrowserInventoryStore(): void {
  currentSnapshot = initialSnapshot
  emitBrowserInventoryChange()
}

function emitBrowserInventoryChange() {
  listeners.forEach((listener) => listener())
}
