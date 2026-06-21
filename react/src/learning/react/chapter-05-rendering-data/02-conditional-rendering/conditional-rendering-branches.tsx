type InventoryPreview = {
  id: string
  name: string
  stock: number
}

const inventoryPreviews: InventoryPreview[] = [
  { id: 'inventory-monitor', name: 'Studio Monitor', stock: 8 },
  { id: 'inventory-microphone', name: 'USB Microphone', stock: 0 },
]

export function ConditionalRenderingBranches() {
  return (
    <article className="practice-panel">
      <p className="practice-kicker">02 · Conditional rendering</p>
      <h2>Expressions select a UI description</h2>
      <p>The ternary expression returns one badge description for each stock value.</p>
      <ul className="rendered-list">
        {inventoryPreviews.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            {product.stock > 0 ? (
              <span className="status-badge status-badge-success">In stock</span>
            ) : (
              <span className="status-badge status-badge-muted">Out of stock</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}
