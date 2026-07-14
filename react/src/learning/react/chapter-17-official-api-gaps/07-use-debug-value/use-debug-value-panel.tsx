import { useDebugValue, useMemo, useState } from 'react'

const debugInventory = [
  { id: 'debug-1', name: 'Laptop stand', stock: 18 },
  { id: 'debug-2', name: 'Studio light', stock: 7 },
  { id: 'debug-3', name: 'Parcel scale', stock: 11 },
]

export function UseDebugValuePanel() {
  const [minimumStock, setMinimumStock] = useState(10)
  const debugLabel = useInventoryDebugLabel(minimumStock)
  const lowStockItems = debugInventory.filter((item) => item.stock < minimumStock)

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useDebugValue</p>
      <h3>Custom hook debug label</h3>
      <form className="api-gap-form">
        <label htmlFor="debug-stock-threshold">Low stock threshold</label>
        <input
          id="debug-stock-threshold"
          max={20}
          min={1}
          onChange={(event) => setMinimumStock(Number(event.currentTarget.value))}
          type="range"
          value={minimumStock}
        />
      </form>
      <div className="api-gap-pill-row">
        <span className="api-gap-pill">{debugLabel}</span>
        <span className="api-gap-pill">{lowStockItems.length} low stock rows</span>
      </div>
      <p>
        DevTools can show the formatted custom hook label, while the UI still reads
        ordinary React state.
      </p>
    </article>
  )
}

function useInventoryDebugLabel(minimumStock: number) {
  const label = useMemo(() => `Low stock threshold ${minimumStock}`, [minimumStock])

  useDebugValue(label, (value) => `SellerHub inventory: ${value}`)

  return label
}
