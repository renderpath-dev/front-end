import { useState } from 'react'

type InventoryItem = {
  id: string
  name: string
  category: 'electronics' | 'office'
  price: number
}

const inventoryItems: InventoryItem[] = [
  { id: 'inventory-dock', name: 'USB-C Dock', category: 'electronics', price: 129 },
  { id: 'inventory-chair', name: 'Task Chair', category: 'office', price: 219 },
  { id: 'inventory-pad', name: 'Desk Pad', category: 'office', price: 35 },
]

export function FilterSortMapBoundary() {
  const [category, setCategory] = useState<'all' | InventoryItem['category']>('all')
  const [ascending, setAscending] = useState(true)

  const filteredItems = inventoryItems.filter(
    (item) => category === 'all' || item.category === category,
  )
  const sortedItems = [...filteredItems].sort((left, right) =>
    ascending ? left.price - right.price : right.price - left.price,
  )

  return (
    <article className="practice-panel">
      <p className="practice-kicker">07 · Array boundaries</p>
      <h2>Filter, copy, sort, then map</h2>
      <div className="practice-actions">
        <button type="button" onClick={() => setCategory('all')}>
          All
        </button>
        <button type="button" onClick={() => setCategory('electronics')}>
          Electronics
        </button>
        <button type="button" onClick={() => setCategory('office')}>
          Office
        </button>
        <button type="button" onClick={() => setAscending((current) => !current)}>
          Price: {ascending ? 'low to high' : 'high to low'}
        </button>
      </div>
      <ul className="rendered-list">
        {sortedItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
