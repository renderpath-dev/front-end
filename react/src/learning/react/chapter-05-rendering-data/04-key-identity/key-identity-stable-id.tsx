import { useState } from 'react'

type KeyedProduct = {
  id: string
  name: string
}

const initialProducts: KeyedProduct[] = [
  { id: 'product-alpha', name: 'Alpha Keyboard' },
  { id: 'product-bravo', name: 'Bravo Headset' },
  { id: 'product-charlie', name: 'Charlie Webcam' },
]

function KeyedProductRow({ product }: { product: KeyedProduct }) {
  const [note, setNote] = useState('')

  return (
    <li className="identity-row">
      <label>
        <span>{product.name}</span>
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Type a row note"
        />
      </label>
    </li>
  )
}

export function KeyIdentityStableId() {
  const [products, setProducts] = useState(initialProducts)

  function handleReverse() {
    setProducts((currentProducts) => [...currentProducts].reverse())
  }

  return (
    <article className="practice-panel">
      <p className="practice-kicker">04 · Key identity</p>
      <h2>Stable IDs preserve row identity</h2>
      <p>Type notes, then reverse the list. Each note stays with the same product ID.</p>
      <button type="button" onClick={handleReverse}>
        Reverse products
      </button>
      <ul className="identity-list">
        {products.map((product) => (
          <KeyedProductRow key={product.id} product={product} />
        ))}
      </ul>
    </article>
  )
}
