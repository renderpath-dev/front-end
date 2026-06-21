import { useState } from 'react'

const productNames = ['Desk lamp', 'Monitor stand', 'Mechanical keyboard']

type ProductFilterInputProps = {
  query: string
  onQueryChange: (nextQuery: string) => void
}

function ProductFilterInput({ query, onQueryChange }: ProductFilterInputProps) {
  return (
    <label>
      Product search
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search products"
      />
    </label>
  )
}

function ProductFilterResults({ query }: { query: string }) {
  const visibleProducts = productNames.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase()),
  )

  return <p>{visibleProducts.join(', ') || 'No matching products'}</p>
}

export function SharedFilterOwner() {
  const [query, setQuery] = useState('')

  return (
    <article className="practice-card">
      <p className="practice-label">State owner</p>
      <h3>Lift shared state to the closest parent</h3>
      <ProductFilterInput query={query} onQueryChange={setQuery} />
      <ProductFilterResults query={query} />
    </article>
  )
}
