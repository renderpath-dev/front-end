import { deriveCatalogProducts } from '../sellerhub-capstone-app/features/catalog/catalog-public-api'
import type { ProductViewModel } from '../sellerhub-capstone-app/shared/api/sellerhub-adapters'

const products: ProductViewModel[] = [
  {
    id: 'desk',
    name: 'Seller Desk',
    description: 'Workspace',
    unitPriceInCents: 32000,
    inventoryLabel: '5 available',
    status: 'active',
  },
  {
    id: 'lamp',
    name: 'Focus Lamp',
    description: 'Task lighting',
    unitPriceInCents: 4500,
    inventoryLabel: '12 available',
    status: 'active',
  },
]

const visibleProducts = deriveCatalogProducts(products, {
  query: '',
  status: 'active',
  sort: 'price-asc',
})

export function CatalogFeaturePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="catalog-feature-title">
      <p className="chapter16-eyebrow">9.6 Catalog feature</p>
      <h2 id="catalog-feature-title">Keep filtering and sorting pure and reviewable</h2>
      <ol className="chapter16-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name}: {product.unitPriceInCents} cents
          </li>
        ))}
      </ol>
    </section>
  )
}
