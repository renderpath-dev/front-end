import { useEffect, useState } from 'react'

type ProductResourceState =
  | { status: 'pending' }
  | { status: 'success'; name: string }
  | { status: 'error'; message: string }

function requestProductName(productId: string): Promise<string> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(`Product ${productId}`), productId === 'A' ? 650 : 300)
  })
}

function useProductResource(productId: string): ProductResourceState {
  const [state, setState] = useState<ProductResourceState>({ status: 'pending' })

  useEffect(() => {
    let ignore = false

    requestProductName(productId)
      .then((name) => {
        if (!ignore) setState({ status: 'success', name })
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown product error',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [productId])

  return state
}

function ProductResourceCard({ productId }: { productId: string }) {
  const state = useProductResource(productId)

  return (
    <div className="resource-box">
      <strong>Resource {productId}</strong>
      <span>{state.status === 'success' ? state.name : state.status}</span>
    </div>
  )
}

export function CustomAsyncResource() {
  return (
    <article className="practice-card">
      <p className="practice-label">Custom async hook</p>
      <h3>Reuse lifecycle logic without sharing state</h3>
      <div className="resource-grid">
        <ProductResourceCard productId="A" />
        <ProductResourceCard productId="B" />
      </div>
    </article>
  )
}
