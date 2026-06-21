import { useEffect, useState } from 'react'

type InventoryChannel = 'warehouse' | 'storefront'

type InventoryState =
  | { status: 'pending'; quantity: number | null }
  | { status: 'success'; quantity: number }
  | { status: 'error'; quantity: number | null; message: string }

function loadInventory(channel: InventoryChannel, signal: AbortSignal): Promise<number> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(
      () => resolve(channel === 'warehouse' ? 42 : 11),
      channel === 'warehouse' ? 900 : 300,
    )

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Inventory request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

export function AbortObsoleteRequest() {
  const [channel, setChannel] = useState<InventoryChannel>('warehouse')
  const [state, setState] = useState<InventoryState>({ status: 'pending', quantity: null })

  useEffect(() => {
    const controller = new AbortController()

    loadInventory(channel, controller.signal)
      .then((quantity) => setState({ status: 'success', quantity }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState((current) => ({
          status: 'error',
          quantity: current.quantity,
          message: error instanceof Error ? error.message : 'Unknown inventory error',
        }))
      })

    return () => controller.abort()
  }, [channel])

  function handleChannelChange(nextChannel: InventoryChannel) {
    setChannel(nextChannel)
    setState((current) => ({ status: 'pending', quantity: current.quantity }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Abort obsolete request</p>
      <h3>Cancel work for the previous criteria</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleChannelChange('warehouse')}>Warehouse</button>
        <button type="button" onClick={() => handleChannelChange('storefront')}>Storefront</button>
      </div>
      <p>Channel: {channel}</p>
      <p>{state.status === 'pending' ? 'Loading inventory...' : `Quantity: ${state.quantity ?? 0}`}</p>
    </article>
  )
}
