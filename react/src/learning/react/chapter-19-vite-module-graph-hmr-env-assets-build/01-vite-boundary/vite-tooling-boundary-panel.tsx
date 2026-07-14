export function ViteToolingBoundaryPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.1 tooling boundary</p>
      <h3>Vite engineering boundary</h3>
      <p>
        Vite loads, transforms, serves, hot-updates, and bundles modules. React renders
        UI after the browser has received executable modules.
      </p>
      <ul>
        <li>Development owner: Vite dev server and native browser ESM requests.</li>
        <li>Runtime owner: React render and commit after modules evaluate.</li>
        <li>Static analysis owner: TypeScript, ESLint, Vitest, and build scripts.</li>
      </ul>
    </article>
  )
}
