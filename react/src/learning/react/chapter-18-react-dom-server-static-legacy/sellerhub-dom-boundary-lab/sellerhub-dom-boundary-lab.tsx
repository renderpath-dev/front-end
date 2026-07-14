import { ClientHydrationBoundaryCard } from './client-hydration-boundary-card'
import { DomBoundaryDecisionTable } from './dom-boundary-decision-table'
import { FlushSyncScrollPanel } from './flush-sync-scroll-panel'
import { LegacyApiReadingPanel } from './legacy-api-reading-panel'
import { PortalHelpDeskModal } from './portal-help-desk-modal'
import { RemovedApiMigrationTable } from './removed-api-migration-table'
import { ResourcePreloadDecisionPanel } from './resource-preload-decision-panel'
import { ServerStaticApiBoundaryCard } from './server-static-api-boundary-card'

export function SellerHubDomBoundaryLab() {
  return (
    <section className="sellerhub-dom-lab" aria-labelledby="sellerhub-dom-lab-title">
      <div>
        <p className="dom-boundary-kicker">9.15 final mini project</p>
        <h2 id="sellerhub-dom-lab-title">SellerHub DOM Boundary Lab</h2>
        <p>
          This is a client-side Vite React lab. It does not create a real SSR server, run
          React Server Components, run react-dom/server streaming in the browser, configure
          static prerender or resume, or migrate the project to Next.js.
        </p>
      </div>
      <div className="chapter-eighteen-grid">
        <PortalHelpDeskModal />
        <FlushSyncScrollPanel />
        <ResourcePreloadDecisionPanel />
        <ClientHydrationBoundaryCard />
        <ServerStaticApiBoundaryCard />
        <LegacyApiReadingPanel />
        <RemovedApiMigrationTable />
        <DomBoundaryDecisionTable />
      </div>
    </section>
  )
}
