import { analyzeSpaDeployment, createGitHubPagesDeploymentExample } from './spa-deployment-model'

export function SpaDeploymentBoundaryPanel() {
  const findings = analyzeSpaDeployment(createGitHubPagesDeploymentExample('front-end'))

  return (
    <section className="route-lab-card" aria-labelledby="spa-deployment-title">
      <p className="route-card-kicker">Part 14</p>
      <h2 id="spa-deployment-title">SPA deployment boundary</h2>
      <p>
        Vite build creates static assets. BrowserRouter deep links still need the static host to
        rewrite valid app URLs to index.html.
      </p>
      <ul className="route-list">
        {findings.map((finding) => (
          <li key={finding.message}>
            <code className="route-code">{finding.level}</code> {finding.message}
          </li>
        ))}
      </ul>
    </section>
  )
}
