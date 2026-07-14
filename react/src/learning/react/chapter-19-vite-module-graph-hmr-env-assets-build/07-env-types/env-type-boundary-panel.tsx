export function EnvTypeBoundaryPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.7 type boundary</p>
      <h3>vite-env.d.ts and env typing</h3>
      <p>
        This project currently receives Vite client types through tsconfig.app.json. A
        src/vite-env.d.ts file would be a local augmentation boundary for custom VITE_
        keys, not a runtime validator.
      </p>
      <pre className="vite-boundary-code">
        {`interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}`}
      </pre>
      <p className="vite-boundary-warning">
        TypeScript can describe expected keys, but it cannot keep a secret out of the
        browser bundle once the key uses the VITE_ prefix.
      </p>
    </article>
  )
}
