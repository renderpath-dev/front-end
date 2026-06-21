type KeyBoundaryItemProps = {
  productId: string
  name: string
}

function KeyBoundaryItem({ productId, name }: KeyBoundaryItemProps) {
  return (
    <li>
      <strong>{name}</strong>
      <span>Readable prop: {productId}</span>
    </li>
  )
}

const keyBoundaryProducts = [
  { id: 'sku-100', name: 'Wireless Mouse' },
  { id: 'sku-200', name: 'Laptop Stand' },
]

export function KeyIsNotProp() {
  return (
    <article className="practice-panel">
      <p className="practice-kicker">05 · Special prop boundary</p>
      <h2>Pass identity data separately from key</h2>
      <p>
        React consumes <code>key</code>. The child reads the same value through the explicit
        <code> productId</code> prop.
      </p>
      <ul className="rendered-list">
        {keyBoundaryProducts.map((product) => (
          <KeyBoundaryItem key={product.id} productId={product.id} name={product.name} />
        ))}
      </ul>
    </article>
  )
}
