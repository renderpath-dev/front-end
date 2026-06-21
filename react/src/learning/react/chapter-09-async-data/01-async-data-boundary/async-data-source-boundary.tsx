import { useState } from 'react'

type StockState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; quantity: number }
  | { status: 'error'; message: string }

function loadWarehouseStock(): Promise<number> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(24), 550)
  })
}

export function AsyncDataSourceBoundary() {
  const [localNote, setLocalNote] = useState('Check receiving schedule')
  const [stockState, setStockState] = useState<StockState>({ status: 'idle' })

  async function handleLoadStock() {
    setStockState({ status: 'pending' })

    try {
      const quantity = await loadWarehouseStock()
      setStockState({ status: 'success', quantity })
    } catch (error: unknown) {
      setStockState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown stock error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Async source boundary</p>
      <h3>Separate local input from external data</h3>
      <label>
        Local note
        <input value={localNote} onChange={(event) => setLocalNote(event.currentTarget.value)} />
      </label>
      <button type="button" onClick={handleLoadStock} disabled={stockState.status === 'pending'}>
        Load warehouse stock
      </button>
      <p>
        {stockState.status === 'idle' && 'Stock has not been requested.'}
        {stockState.status === 'pending' && 'Loading stock...'}
        {stockState.status === 'success' && `Available units: ${stockState.quantity}`}
        {stockState.status === 'error' && stockState.message}
      </p>
    </article>
  )
}
