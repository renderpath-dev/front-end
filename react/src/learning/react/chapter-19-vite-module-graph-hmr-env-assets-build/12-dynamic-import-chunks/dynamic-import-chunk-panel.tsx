import { useState } from 'react'
import type { ComponentType } from 'react'

export function DynamicImportChunkPanel() {
  const [LoadedChunk, setLoadedChunk] = useState<ComponentType | null>(null)

  async function loadAuditChunk() {
    const module = await import('./chunk-audit-card')
    setLoadedChunk(() => module.ChunkAuditCard)
  }

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.12 dynamic import</p>
      <h3>Dynamic import and chunk boundary</h3>
      <p>
        Dynamic import creates an async module boundary that Vite can bundle as a chunk
        when the import path is statically analyzable.
      </p>
      <button className="vite-boundary-button" type="button" onClick={loadAuditChunk}>
        Load chunk audit card
      </button>
      {LoadedChunk ? <LoadedChunk /> : <p className="vite-boundary-muted">Chunk not loaded yet.</p>}
    </article>
  )
}
