import { useReducer } from 'react'

type Product = {
  id: string
  name: string
  selected: boolean
}

type ProductAction = {
  type: 'selection_toggled'
  productId: string
}

function productReducer(products: Product[], action: ProductAction): Product[] {
  return products.map((product) =>
    product.id === action.productId
      ? { ...product, selected: !product.selected }
      : product,
  )
}

const initialProducts: Product[] = [
  { id: 'sku-201', name: 'Packing tape', selected: false },
  { id: 'sku-202', name: 'Shipping labels', selected: true },
]

export function PureReducerImmutability() {
  const [products, dispatch] = useReducer(productReducer, initialProducts)

  return (
    <article className="practice-card">
      <p className="practice-label">Pure reducer</p>
      <h3>Return new references without effects</h3>
      <div className="practice-list">
        {products.map((product) => (
          <label key={product.id}>
            <input
              type="checkbox"
              checked={product.selected}
              onChange={() =>
                dispatch({ type: 'selection_toggled', productId: product.id })
              }
            />
            {product.name}
          </label>
        ))}
      </div>
    </article>
  )
}
