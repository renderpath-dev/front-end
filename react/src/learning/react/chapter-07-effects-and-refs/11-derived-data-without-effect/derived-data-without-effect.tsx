import { useState } from 'react'

const inventoryNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']

export function DerivedDataWithoutEffect() {
  const [query, setQuery] = useState('')
  const visibleNames = inventoryNames.filter((inventoryName) =>
    inventoryName.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="practice-card">
      <p className="practice-label">No effect required</p>
      <h3>Derive filtered results during render</h3>
      <label>
        Local filter
        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />
      </label>
      <p>{visibleNames.join(', ') || 'No matching products'}</p>
    </section>
  )
}
