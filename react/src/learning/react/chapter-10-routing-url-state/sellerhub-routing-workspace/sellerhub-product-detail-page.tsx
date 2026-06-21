import { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router'
import { requestSellerHubProduct } from './sellerhub-product-request'
import type { SellerHubProduct } from './sellerhub-catalog-data'

type ProductDetailState =
  | { status: 'pending'; productId: string }
  | { status: 'success'; product: SellerHubProduct }
  | { status: 'error'; message: string }

type ProductDetailAction =
  | { type: 'request'; productId: string }
  | { type: 'resolve'; product: SellerHubProduct }
  | { type: 'reject'; message: string }

function assertNever(action: never): never {
  throw new Error(`Unhandled product detail action: ${JSON.stringify(action)}`)
}

function productDetailReducer(
  _state: ProductDetailState,
  action: ProductDetailAction,
): ProductDetailState {
  switch (action.type) {
    case 'request':
      return { status: 'pending', productId: action.productId }
    case 'resolve':
      return { status: 'success', product: action.product }
    case 'reject':
      return { status: 'error', message: action.message }
    default:
      return assertNever(action)
  }
}

function isSellerHubProduct(value: unknown): value is SellerHubProduct {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (candidate.category === 'lighting' || candidate.category === 'office') &&
    typeof candidate.price === 'number'
  )
}

function SellerHubProductResource({ productId }: { productId: string }) {
  const [resourceState, dispatch] = useReducer(productDetailReducer, {
    status: 'pending',
    productId,
  })

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    dispatch({ type: 'request', productId })

    void requestSellerHubProduct(productId, controller.signal)
      .then((value) => {
        if (ignore) {
          return
        }

        if (isSellerHubProduct(value)) {
          dispatch({ type: 'resolve', product: value })
        } else {
          dispatch({ type: 'reject', message: 'Product response failed runtime validation.' })
        }
      })
      .catch((error: unknown) => {
        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {
          dispatch({
            type: 'reject',
            message: error instanceof Error ? error.message : 'Unknown product request failure.',
          })
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [productId])

  if (resourceState.status === 'pending') {
    return <p>Loading product {resourceState.productId}...</p>
  }

  if (resourceState.status === 'error') {
    return <p className="routing-error-text">{resourceState.message}</p>
  }

  return (
    <article className="sellerhub-detail-card">
      <span>{resourceState.product.category}</span>
      <h3>{resourceState.product.name}</h3>
      <p>${resourceState.product.price}</p>
      <Link to="/checkout">Continue to checkout</Link>
    </article>
  )
}

export function SellerHubProductDetailPage() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">The route did not provide productId.</p>
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Dynamic route and async criteria</p>
          <h3>Product detail</h3>
        </div>
        <code>/catalog/{productId}</code>
      </div>
      <SellerHubProductResource key={productId} productId={productId} />
    </section>
  )
}
