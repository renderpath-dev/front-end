export function ChunkAuditCard() {
  return (
    <section className="vite-boundary-note" aria-label="Loaded chunk audit">
      <h4>Loaded chunk audit</h4>
      <p>
        This component arrived through a dynamic import split point. It is a module loading
        boundary, not a data fetching boundary.
      </p>
    </section>
  )
}
