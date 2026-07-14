import { AssetImportLab } from './asset-import-lab'
import { BuildDeployDecisionTable } from './build-deploy-decision-table'
import { DynamicChunkBoundaryCard } from './dynamic-chunk-boundary-card'
import { EnvExposureAuditor } from './env-exposure-auditor'
import { GlobContentReader } from './glob-content-reader'
import { HmrLifecycleCard } from './hmr-lifecycle-card'
import { ModuleGraphInspector } from './module-graph-inspector'
import { ToolingReviewChecklist } from './tooling-review-checklist'
import { WorkerMetricPanel } from './worker-metric-panel'

export function SellerHubViteBoundaryLab() {
  return (
    <section className="sellerhub-vite-lab" aria-labelledby="sellerhub-vite-lab-title">
      <p className="vite-boundary-kicker">9.17 final project</p>
      <h2 id="sellerhub-vite-lab-title">SellerHub Vite Boundary Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not deploy to a real host, create an
        SSR server, migrate to Next.js, publish a Vite plugin, store secrets in VITE_
        variables, or treat tests as proof of live HMR or production hosting.
      </p>
      <div className="chapter-nineteen-grid">
        <ModuleGraphInspector />
        <HmrLifecycleCard />
        <EnvExposureAuditor />
        <AssetImportLab />
        <WorkerMetricPanel />
        <GlobContentReader />
        <DynamicChunkBoundaryCard />
        <BuildDeployDecisionTable />
        <ToolingReviewChecklist />
      </div>
    </section>
  )
}
