import {
  analyzeSpaDeployment,
  createGitHubPagesDeploymentExample,
} from '../14-spa-deployment/spa-deployment-model'

export function SellerHubDeploymentBoundaryCard() {
  const findings = analyzeSpaDeployment(createGitHubPagesDeploymentExample('front-end'))

  return (
    <section aria-labelledby="sellerhub-deployment-title" className="route-lab-card">
      <p className="route-card-kicker">Deployment boundary</p>
      <h3 id="sellerhub-deployment-title">SellerHub deployment boundary card</h3>
      <p>
        This lab does not deploy to a real static host. It separates BrowserRouter, basename,
        Vite base, static rewrites, Vite preview, and HashRouter tradeoffs.
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
