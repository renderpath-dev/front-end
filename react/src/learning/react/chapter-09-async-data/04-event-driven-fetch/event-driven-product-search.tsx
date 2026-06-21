import { useState } from 'react'

type SearchState =
  | { status: 'idle'; products: string[] }
  | { status: 'pending'; products: string[] }
  | { status: 'success'; products: string[] }
  | { status: 'empty'; products: string[] }
  | { status: 'error'; products: string[]; message: string }

const productNames = ['Desk Lamp', 'Monitor Stand', 'Mechanical Keyboard', 'Wireless Mouse']

function searchProducts(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(productNames.filter((name) => name.toLowerCase().includes(query.toLowerCase())))
    }, 500)
  })
}

export function EventDrivenProductSearch() {
  const [draftQuery, setDraftQuery] = useState('desk')
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)
  const [state, setState] = useState<SearchState>({ status: 'idle', products: [] })

  async function handleSearch() {
    const nextQuery = draftQuery.trim()
    setSubmittedQuery(nextQuery)
    setState((current) => ({ status: 'pending', products: current.products }))

    try {
      const products = await searchProducts(nextQuery)
      setState(
        products.length === 0
          ? { status: 'empty', products: [] }
          : { status: 'success', products },
      )
    } catch (error: unknown) {
      setState((current) => ({
        status: 'error',
        products: current.products,
        message: error instanceof Error ? error.message : 'Unknown search error',
      }))
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Event-driven request</p>
      <h3>Search only after explicit confirmation</h3>
      <label>
        Draft query
        <input value={draftQuery} onChange={(event) => setDraftQuery(event.currentTarget.value)} />
      </label>
      <button type="button" onClick={handleSearch} disabled={state.status === 'pending'}>
        Search products
      </button>
      <p>Submitted query: {submittedQuery ?? 'none'}</p>
      <p>
        {state.status === 'pending' ? 'Searching...' : `${state.products.length} products`}
      </p>
    </article>
  )
}
