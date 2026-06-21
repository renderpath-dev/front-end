type CatalogItem = {
  id: string
  name: string
  category: string
}

const catalogItems: CatalogItem[] = [
  { id: 'product-keyboard', name: 'Mechanical Keyboard', category: 'Electronics' },
  { id: 'product-chair', name: 'Ergonomic Chair', category: 'Office' },
  { id: 'product-lamp', name: 'Desk Lamp', category: 'Home' },
]

export function ArrayRenderingWithMap() {
  const productNodes = catalogItems.map((item) => (
    <li key={item.id}>
      <strong>{item.name}</strong>
      <span>{item.category}</span>
    </li>
  ))

  return (
    <article className="practice-panel">
      <p className="practice-kicker">01 · Array rendering</p>
      <h2>JavaScript arrays become React nodes</h2>
      <p>
        <code>map()</code> returns a new array whose values are lightweight React element
        descriptions.
      </p>
      <ul className="rendered-list">{productNodes}</ul>
    </article>
  )
}
