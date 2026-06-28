import { SellerHubActionWorkspace } from './sellerhub-action-workspace'
import { SellerHubCompilerBoundaryMap } from './sellerhub-compiler-boundary-map'

export function SellerHubReact19ActionsLab() {
  return (
    <section
      className="chapter14-panel chapter14-final-project"
      aria-labelledby="sellerhub-react19-lab-title"
    >
      <p className="chapter14-kicker">Final mini project</p>
      <h2 id="sellerhub-react19-lab-title">SellerHub React 19 Actions Lab</h2>
      <p>
        This browser-only lab integrates client Actions, Action state, form status,
        optimistic reconciliation, framework boundary notes, and compiler migration
        evidence. It does not provide a backend, Server Function runtime, or Compiler
        transform.
      </p>
      <SellerHubActionWorkspace />
      <SellerHubCompilerBoundaryMap />
    </section>
  )
}
