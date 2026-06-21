import { useState } from 'react'

const products = [
  { id: 'keyboard', name: 'Mechanical keyboard', price: 89 },
  { id: 'mouse', name: 'Wireless mouse', price: 45 },
]

export function MinimalCartState() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    keyboard: 1,
    mouse: 0,
  })

  const totalCount = products.reduce(
    (total, product) => total + (quantities[product.id] ?? 0),
    0,
  )
  const subtotal = products.reduce(
    (total, product) => total + product.price * (quantities[product.id] ?? 0),
    0,
  )

  function increaseQuantity(productId: string) {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Minimal state</p>
      <h3>Derive totals during render</h3>
      <div className="practice-stack">
        {products.map((product) => (
          <button key={product.id} onClick={() => increaseQuantity(product.id)}>
            Add {product.name}
          </button>
        ))}
      </div>
      <p>
        {totalCount} items · ${subtotal.toFixed(2)}
      </p>
    </article>
  )
}
