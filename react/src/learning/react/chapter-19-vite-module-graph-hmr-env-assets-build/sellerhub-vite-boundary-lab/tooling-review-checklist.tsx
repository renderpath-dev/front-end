import { toolingReviewItems } from './sellerhub-vite-boundary-data'

export function ToolingReviewChecklist() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Tooling review checklist</h3>
      <p>
        Use this checklist before changing Vite config, env naming, asset imports, worker
        boundaries, glob discovery, or deployment paths.
      </p>
      <ul>
        {toolingReviewItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
