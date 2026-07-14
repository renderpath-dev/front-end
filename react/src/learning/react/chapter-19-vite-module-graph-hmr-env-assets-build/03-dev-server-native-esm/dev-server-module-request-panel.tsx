const requestSteps = [
  'Browser requests the HTML entry.',
  'The module script requests TypeScript or TSX source by URL.',
  'Vite transforms the requested module on demand.',
  'The browser follows further ESM imports as more URLs.',
  'Production build later replaces this request graph with optimized chunks.',
] as const

export function DevServerModuleRequestPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.3 native ESM</p>
      <h3>Dev server module requests</h3>
      <p>
        Development speed comes from serving transformed source modules only when the
        browser asks for them, not from rebuilding the entire production bundle.
      </p>
      <ol>
        {requestSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </article>
  )
}
