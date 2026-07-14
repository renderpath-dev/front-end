import { useRef, useState } from 'react'
import { createSellerHubDemoApiClient } from './sellerhub-demo-api-client'

export function AbortableCatalogSearchPanel() {
  const clientRef = useRef(createSellerHubDemoApiClient())
  const controllerRef = useRef<AbortController | null>(null)
  const [status, setStatus] = useState('idle')

  function runSearch(): void {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setStatus('pending')

    void clientRef.current
      .searchCatalogResource('lamp', controller.signal, 80)
      .then((products) => {
        setStatus(`success:${products.length}`)
      })
      .catch((error: unknown) => {
        setStatus(error instanceof DOMException ? error.name : 'failed')
      })
  }

  function abortSearch(): void {
    controllerRef.current?.abort()
  }

  return (
    <section className="data-fetching-card" aria-labelledby="abortable-search-title">
      <h3 id="abortable-search-title">Abortable catalog search panel</h3>
      <p>Each search owns a fresh AbortController and one AbortSignal.</p>
      <button onClick={runSearch} type="button">
        Start abortable search
      </button>
      <button onClick={abortSearch} type="button">
        Abort search
      </button>
      <p role="status">Abortable search state: {status}</p>
    </section>
  )
}
