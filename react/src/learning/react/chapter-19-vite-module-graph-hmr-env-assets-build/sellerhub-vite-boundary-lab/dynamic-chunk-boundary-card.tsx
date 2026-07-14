import { useState } from 'react'
import type { ComponentType } from 'react'

export function DynamicChunkBoundaryCard() {
  const [LoadedChunk, setLoadedChunk] = useState<ComponentType | null>(null)

  async function loadChunk() {
    const module = await import('../12-dynamic-import-chunks/chunk-audit-card')
    setLoadedChunk(() => module.ChunkAuditCard)
  }

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Dynamic chunk boundary card</h3>
      <p>
        A route or feature can defer code loading with dynamic import, but it still needs
        predictable import paths for bundling.
      </p>
      <button className="vite-boundary-button" type="button" onClick={loadChunk}>
        Load boundary chunk
      </button>
      {LoadedChunk ? <LoadedChunk /> : <p className="vite-boundary-muted">Boundary chunk idle.</p>}
    </article>
  )
}
