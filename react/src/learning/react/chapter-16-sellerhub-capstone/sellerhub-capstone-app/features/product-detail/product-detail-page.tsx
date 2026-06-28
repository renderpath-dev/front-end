import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { adaptProductDto } from '../../shared/api/sellerhub-adapters'
import type { ProductViewModel } from '../../shared/api/sellerhub-adapters'
import { assertProductDto } from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'

type ProductDetailResource =
  | { status: 'loading' }
  | { status: 'success'; product: ProductViewModel }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

export function ProductDetailPage() {
  const { productId } = useParams()
  const [resource, setResource] = useState<ProductDetailResource>({ status: 'loading' })
  const { cartDispatch, locale, reportError } = useSellerHubApp()

  useEffect(() => {
    let ignore = false

    async function loadProduct() {
      if (!productId) {
        setResource({ status: 'not-found' })
        return
      }

      setResource({ status: 'loading' })

      try {
        const response = await mockSellerHubGateway.getProduct(productId)
        assertProductDto(response)

        if (!ignore) {
          setResource({ status: 'success', product: adaptProductDto(response) })
        }
      } catch (error) {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)

          if (normalizedError.kind === 'not-found') {
            setResource({ status: 'not-found' })
          } else {
            reportError('product-detail', normalizedError)
            setResource({ status: 'error', message: normalizedError.message })
          }
        }
      }
    }

    void loadProduct()

    return () => {
      ignore = true
    }
  }, [productId, reportError])

  if (resource.status === 'loading') {
    return <p role="status">Loading product...</p>
  }

  if (resource.status === 'not-found') {
    return (
      <section className="sellerhub-route-state">
        <h2>Product not found</h2>
        <Link to="/react/chapter-16/catalog">Return to catalog</Link>
      </section>
    )
  }

  if (resource.status === 'error') {
    return (
      <section className="sellerhub-route-state" role="alert">
        <h2>Product unavailable</h2>
        <p>{resource.message}</p>
      </section>
    )
  }

  const { product } = resource

  return (
    <article className="sellerhub-detail">
      <p className="sellerhub-eyebrow">Product lifecycle: success</p>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <dl className="sellerhub-definition-list">
        <div>
          <dt>Price</dt>
          <dd>{formatCurrency(product.unitPriceInCents, locale)}</dd>
        </div>
        <div>
          <dt>Inventory</dt>
          <dd>{product.inventoryLabel}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{product.status}</dd>
        </div>
      </dl>
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
    </article>
  )
}
