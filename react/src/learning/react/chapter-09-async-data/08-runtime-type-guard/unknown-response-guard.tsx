import { useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
}

type GuardState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; products: Product[] }
  | { status: 'error'; message: string }

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number'
  )
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}

function loadUnknownResponse(valid: boolean): Promise<unknown> {
  return Promise.resolve(
    valid
      ? [{ id: 'sku-801', name: 'USB-C Hub', price: 59 }]
      : [{ id: 801, title: 'Invalid product' }],
  )
}

export function UnknownResponseGuard() {
  const [state, setState] = useState<GuardState>({ status: 'idle' })

  async function handleLoad(valid: boolean) {
    setState({ status: 'pending' })
    const body = await loadUnknownResponse(valid)

    if (!isProductArray(body)) {
      setState({ status: 'error', message: 'Response did not match Product[]' })
      return
    }

    setState({ status: 'success', products: body })
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Unknown boundary</p>
      <h3>Narrow runtime data before domain use</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleLoad(true)}>Valid response</button>
        <button type="button" onClick={() => handleLoad(false)}>Invalid response</button>
      </div>
      <p>
        {state.status === 'idle' && 'Choose a response shape.'}
        {state.status === 'pending' && 'Parsing response...'}
        {state.status === 'success' && `${state.products.length} valid product`}
        {state.status === 'error' && state.message}
      </p>
    </article>
  )
}
