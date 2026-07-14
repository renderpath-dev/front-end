import './chapter-18-practice.css'
import { DomOwnerTreePanel } from './01-dom-boundary/dom-owner-tree-panel'
import { PortalModalBoundary } from './02-create-portal/portal-modal-boundary'
import { FlushSyncMeasurementPanel } from './03-flush-sync/flush-sync-measurement-panel'
import { ResourcePreloadingPanel } from './04-resource-preloading/resource-preloading-panel'
import { ClientHydrationRootMap } from './05-client-hydration-root/client-hydration-root-map'
import { HydrationMismatchReader } from './06-hydration-mismatch/hydration-mismatch-reader'
import { ServerRenderingBoundaryPanel } from './07-server-rendering-blocking/server-rendering-boundary-panel'
import { ServerStreamingBoundaryPanel } from './08-server-streaming/server-streaming-boundary-panel'
import { StaticResumeBoundaryPanel } from './09-static-resume-boundary/static-resume-boundary-panel'
import { RemovedDomApiMigrationPanel } from './10-removed-dom-apis/removed-dom-api-migration-panel'
import { LegacyElementCompositionPanel } from './11-legacy-element-composition/legacy-element-composition-panel'
import { ClassRefLegacyReader } from './12-class-ref-legacy/class-ref-legacy-reader'
import { ValidElementBoundaryPanel } from './13-valid-element-boundary/valid-element-boundary-panel'
import { SellerHubDomServerLegacyMap } from './14-sellerhub-dom-server-legacy-map/sellerhub-dom-server-legacy-map'
import { SellerHubDomBoundaryLab } from './sellerhub-dom-boundary-lab/sellerhub-dom-boundary-lab'

export function Chapter18PracticeRoot() {
  return (
    <main className="chapter-eighteen-shell">
      <header className="chapter-eighteen-hero">
        <p className="chapter-eighteen-eyebrow">React Chapter 18</p>
        <h1>React DOM, Server / Static APIs, and Legacy API Reading</h1>
        <p>
          Distinguish browser DOM APIs, client roots, hydration roots, server and static
          rendering boundaries, removed DOM APIs, and legacy reading patterns.
        </p>
        <div className="dom-boundary-pill-row" aria-label="Chapter 18 coverage">
          <span className="dom-boundary-pill">Runnable client DOM APIs</span>
          <span className="dom-boundary-pill dom-boundary-pill-warning">Server boundary maps</span>
          <span className="dom-boundary-pill dom-boundary-pill-success">Migration reading</span>
        </div>
      </header>

      <div className="chapter-eighteen-layout">
        <section className="chapter-eighteen-section" aria-labelledby="chapter-18-dom">
          <h2 id="chapter-18-dom">Runnable DOM and client boundary practice</h2>
          <div className="chapter-eighteen-grid">
            <DomOwnerTreePanel />
            <PortalModalBoundary />
            <FlushSyncMeasurementPanel />
            <ResourcePreloadingPanel />
            <ClientHydrationRootMap />
            <HydrationMismatchReader />
          </div>
        </section>

        <section className="chapter-eighteen-section" aria-labelledby="chapter-18-server">
          <h2 id="chapter-18-server">Server, static, removed, and legacy boundary reading</h2>
          <div className="chapter-eighteen-grid">
            <ServerRenderingBoundaryPanel />
            <ServerStreamingBoundaryPanel />
            <StaticResumeBoundaryPanel />
            <RemovedDomApiMigrationPanel />
            <LegacyElementCompositionPanel />
            <ClassRefLegacyReader />
            <ValidElementBoundaryPanel />
            <SellerHubDomServerLegacyMap />
          </div>
        </section>

        <SellerHubDomBoundaryLab />
      </div>
    </main>
  )
}
