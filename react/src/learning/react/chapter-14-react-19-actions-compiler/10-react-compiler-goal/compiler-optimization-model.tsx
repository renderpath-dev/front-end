import { useState } from 'react'

type Product = {
  id: string
  name: string
  category: string
}

const products: Product[] = [
  { id: 'product-1', name: 'Desk Lamp', category: 'Lighting' },
  { id: 'product-2', name: 'Travel Mug', category: 'Kitchen' },
  { id: 'product-3', name: 'Task Chair', category: 'Office' },
]

const compilerSetup = {
  configured: false,
  runtimeBehavior: 'The component renders normally without compiler-generated memoization.',
  buildBehavior: 'Vite transforms TSX, but no React Compiler plugin runs.',
}

export function CompilerOptimizationModel() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  )

  return (
    <section className="chapter14-panel" aria-labelledby="compiler-goal-title">
      <p className="chapter14-kicker">9.10 React Compiler goal</p>
      <h2 id="compiler-goal-title">Automatic memoization without changing render semantics</h2>
      <label className="chapter14-field">
        Product filter
        <input
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />
      </label>
      <ul className="chapter14-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.category}</span>
          </li>
        ))}
      </ul>
      <p className="chapter14-note">{compilerSetup.runtimeBehavior}</p>
      <p className="chapter14-note">{compilerSetup.buildBehavior}</p>
    </section>
  )
}
