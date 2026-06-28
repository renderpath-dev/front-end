import { sellerHubArchitectureBoundaries } from './sellerhub-nextjs-boundary-map'
import { sellerHubRouteTree } from './sellerhub-nextjs-route-tree'

export function SellerHubNextjsArchitectureLab() {
  return (
    <section className="chapter13-panel chapter13-final-project" aria-labelledby="sellerhub-lab-title">
      <p className="chapter13-kicker">Final mini project</p>
      <h2 id="sellerhub-lab-title">SellerHub Next.js Architecture Lab</h2>
      <p>
        This lab is an architecture simulation inside the Vite learning project. It
        does not create a real Next.js app, install Next.js, or add a root app directory.
      </p>

      <div className="chapter13-section-split">
        <article className="chapter13-card">
          <h3>Conceptual route tree</h3>
          <ul className="chapter13-list">
            {sellerHubRouteTree.map((routeNode) => (
              <li key={routeNode.conceptualPath}>
                <strong>{routeNode.conceptualPath}</strong>
                <span>{routeNode.kind}</span>
                <span>{routeNode.boundary}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="chapter13-card">
          <h3>Server and client boundary map</h3>
          <ul className="chapter13-list">
            {sellerHubArchitectureBoundaries.map((boundary) => (
              <li key={boundary.scenario}>
                <strong>{boundary.scenario}</strong>
                <span>{boundary.serverOwner}</span>
                <span>{boundary.clientOwner}</span>
                <span>{boundary.risk}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
