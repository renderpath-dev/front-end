import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { Field } from '../../design-system/field'
import { StatusTabs } from '../../design-system/status-tabs'
import {
  adaptProductDto,
} from '../../shared/api/sellerhub-adapters'
import type { ProductViewModel } from '../../shared/api/sellerhub-adapters'
import {
  assertProductListDto,
} from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import {
  deriveCatalogProducts,
  readCatalogCriteria,
} from './catalog-model'
import type { CatalogSort, CatalogStatusFilter } from './catalog-model'

type CatalogResource =
  | { status: 'loading' }
  | { status: 'success'; products: ProductViewModel[] }
  | { status: 'error'; message: string }

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const

export function CatalogPage() {
  const [resource, setResource] = useState<CatalogResource>({ status: 'loading' })
  const [searchParams, setSearchParams] = useSearchParams()
  const { cartDispatch, locale, reportError } = useSellerHubApp()
  const criteria = readCatalogCriteria(searchParams)

  useEffect(() => {
    let ignore = false

    async function loadCatalog() {
      try {
        const response = await mockSellerHubGateway.listProducts()
        assertProductListDto(response)

        if (!ignore) {
          setResource({
            status: 'success',
            products: response.items.map(adaptProductDto),
          })
        }
      } catch (error) {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)
          reportError('catalog', normalizedError)
          setResource({ status: 'error', message: normalizedError.message })
        }
      }
    }

    void loadCatalog()

    return () => {
      ignore = true
    }
  }, [reportError])

  function updateCriteria(key: 'query' | 'sort' | 'status', value: string) {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all' || (key === 'sort' && value === 'name')) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }

    setSearchParams(nextParams)
  }

  if (resource.status === 'loading') {
    return <p role="status">Loading catalog...</p>
  }

  if (resource.status === 'error') {
    return (
      <section className="sellerhub-route-state" role="alert">
        <h2>Catalog unavailable</h2>
        <p>{resource.message}</p>
      </section>
    )
  }

  const visibleProducts = deriveCatalogProducts(resource.products, criteria)

  return (
    <section aria-labelledby="sellerhub-catalog-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Buyer workflow</p>
          <h2 id="sellerhub-catalog-title">
            {sellerHubMessages[locale].catalogTitle}
          </h2>
        </div>
        <p>{visibleProducts.length} matching products</p>
      </div>

      <div className="sellerhub-filter-bar">
        <Field htmlFor="catalog-query" label="Search products">
          <input
            id="catalog-query"
            onChange={(event) => updateCriteria('query', event.target.value)}
            placeholder="Search by name or description"
            type="search"
            value={criteria.query}
          />
        </Field>

        <Field htmlFor="catalog-sort" label="Sort products">
          <select
            id="catalog-sort"
            onChange={(event) =>
              updateCriteria('sort', event.target.value as CatalogSort)
            }
            value={criteria.sort}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </Field>

        <StatusTabs<CatalogStatusFilter>
          controlsId="catalog-results"
          label="Product status"
          onChange={(status) => updateCriteria('status', status)}
          options={statusOptions}
          value={criteria.status}
        />
      </div>

      {visibleProducts.length === 0 ? (
        <div className="sellerhub-route-state">
          <h3>No products match</h3>
          <p>Change the URL-backed catalog criteria and try again.</p>
        </div>
      ) : (
        <div
          aria-labelledby={`catalog-results-${criteria.status}-tab`}
          aria-live="polite"
          className="sellerhub-product-grid"
          id="catalog-results"
          role="tabpanel"
        >
          {visibleProducts.map((product) => (
            <article className="sellerhub-card" key={product.id}>
              <div className="sellerhub-card-heading">
                <h3>{product.name}</h3>
                <span className={`sellerhub-status sellerhub-status-${product.status}`}>
                  {product.status}
                </span>
              </div>
              <p>{product.description}</p>
              <strong>{formatCurrency(product.unitPriceInCents, locale)}</strong>
              <small>{product.inventoryLabel}</small>
              <div className="sellerhub-card-actions">
                <Link to={`/react/chapter-16/products/${product.id}`}>View details</Link>
                <PrimitiveButton
                  disabled={product.status === 'archived'}
                  onClick={() =>
                    cartDispatch({
                      type: 'product-added',
                      line: {
                        productId: product.id,
                        name: product.name,
                        unitPriceInCents: product.unitPriceInCents,
                      },
                    })
                  }
                >
                  Add to cart
                </PrimitiveButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
