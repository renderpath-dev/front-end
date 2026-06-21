import { useState } from 'react'

type Scenario = 'success' | 'empty' | 'error'

type AsyncProductsState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; products: string[] }
  | { status: 'empty' }
  | { status: 'error'; message: string }

function requestProducts(scenario: Scenario): Promise<string[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (scenario === 'error') {
        reject(new Error('Product service unavailable'))
        return
      }

      resolve(scenario === 'empty' ? [] : ['Desk Lamp', 'Monitor Stand'])
    }, 450)
  })
}

export function AsyncLifecycleUnion() {
  const [state, setState] = useState<AsyncProductsState>({ status: 'idle' })

  async function runScenario(scenario: Scenario) {
    setState({ status: 'pending' })

    try {
      const products = await requestProducts(scenario)
      setState(products.length === 0 ? { status: 'empty' } : { status: 'success', products })
    } catch (error: unknown) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown product error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Lifecycle union</p>
      <h3>Make UI states mutually exclusive</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => runScenario('success')}>Success</button>
        <button type="button" onClick={() => runScenario('empty')}>Empty</button>
        <button type="button" onClick={() => runScenario('error')}>Error</button>
      </div>
      <p>Status: {state.status}</p>
      {state.status === 'success' && <p>{state.products.join(', ')}</p>}
      {state.status === 'error' && <p className="status-error">{state.message}</p>}
    </article>
  )
}
