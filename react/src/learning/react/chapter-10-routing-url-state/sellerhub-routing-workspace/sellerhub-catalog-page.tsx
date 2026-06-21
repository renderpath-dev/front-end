import { Link, useSearchParams } from 'react-router'
import { sellerHubProducts } from './sellerhub-catalog-data'
import type { SellerHubCategory } from './sellerhub-catalog-data'

const sellerHubCategories: SellerHubCategory[] = ['all', 'lighting', 'office']

function parseCategory(value: string | null): SellerHubCategory {
  return sellerHubCategories.includes(value as SellerHubCategory)
    ? (value as SellerHubCategory)
    : 'all'
}

export function SellerHubCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = parseCategory(searchParams.get('category'))
  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const visibleProducts = sellerHubProducts.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesQuery = product.name.toLowerCase().includes(searchQuery)
    return matchesCategory && matchesQuery
  })

  function updateSearchParam(name: 'category' | 'q', value: string): void {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all') {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams)
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Public route</p>
          <h3>Catalog</h3>
        </div>
        <code>/catalog?category={category}&amp;q={searchQuery || '...'}</code>
      </div>
      <div className="sellerhub-filter-row">
        <label className="routing-field">
          <span>Category URL state</span>
          <select
            onChange={(event) => updateSearchParam('category', event.currentTarget.value)}
            value={category}
          >
            {sellerHubCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="routing-field">
          <span>Search URL state</span>
          <input
            onChange={(event) => updateSearchParam('q', event.currentTarget.value)}
            placeholder="Search products"
            value={searchParams.get('q') ?? ''}
          />
        </label>
      </div>
      <div className="sellerhub-product-grid">
        {visibleProducts.map((product) => (
          <article className="sellerhub-product-card" key={product.id}>
            <span>{product.category}</span>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <Link to={`/catalog/${product.id}`}>View product route</Link>
          </article>
        ))}
      </div>
      {visibleProducts.length === 0 && <p>No products match the URL criteria.</p>}
    </section>
  )
}
