import { useState } from 'react'

type ResponseMode = 'success' | 'not-found' | 'network-error'

type HttpState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; body: unknown }
  | { status: 'error'; message: string }

async function requestResponse(mode: ResponseMode): Promise<Response> {
  await new Promise((resolve) => window.setTimeout(resolve, 350))

  if (mode === 'network-error') {
    throw new TypeError('Network connection failed')
  }

  if (mode === 'not-found') {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ id: 'sku-301', name: 'Desk Lamp' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function HttpResponseBoundary() {
  const [state, setState] = useState<HttpState>({ status: 'idle' })

  async function handleRequest(mode: ResponseMode) {
    setState({ status: 'pending' })

    try {
      const response = await requestResponse(mode)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const body: unknown = await response.json()
      setState({ status: 'success', body })
    } catch (error: unknown) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown request error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">HTTP boundary</p>
      <h3>Separate rejected fetch from non-2xx status</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleRequest('success')}>200</button>
        <button type="button" onClick={() => handleRequest('not-found')}>404</button>
        <button type="button" onClick={() => handleRequest('network-error')}>Network error</button>
      </div>
      <p>
        {state.status === 'idle' && 'Choose a response.'}
        {state.status === 'pending' && 'Waiting for response...'}
        {state.status === 'success' && JSON.stringify(state.body)}
        {state.status === 'error' && state.message}
      </p>
    </article>
  )
}
