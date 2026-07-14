export function SsrBackendBoundaryPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.15 SSR boundary</p>
      <h3>SSR and backend integration boundary</h3>
      <p>
        Vite can support SSR and backend integration, but this learning app remains a
        client-side Vite React lab. It does not create server entry files, middleware mode,
        a backend manifest pipeline, or a Next.js framework runtime.
      </p>
      <ul>
        <li>SSR needs separate client and server entries.</li>
        <li>Backend integration may use a build manifest and server HTML templates.</li>
        <li>This chapter documents readiness signals instead of faking execution.</li>
      </ul>
    </article>
  )
}
