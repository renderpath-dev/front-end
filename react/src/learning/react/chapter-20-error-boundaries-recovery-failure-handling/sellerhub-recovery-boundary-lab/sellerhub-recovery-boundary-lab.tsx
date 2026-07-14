import { CatalogCrashLab } from './catalog-crash-lab'
import { DashboardWidgetBoundary } from './dashboard-widget-boundary'
import { ErrorLogPreview } from './error-log-preview'
import { OrdersRetryPanel } from './orders-retry-panel'
import { PluginIsolationPanel } from './plugin-isolation-panel'
import { RecoveryDecisionTable } from './recovery-decision-table'
import { SuspenseErrorCompositionPanel } from './suspense-error-composition-panel'

export function SellerHubRecoveryBoundaryLab() {
  return (
    <section className="recovery-lab" aria-labelledby="sellerhub-recovery-lab-title">
      <p className="recovery-card-kicker">9.14 final project</p>
      <h2 id="sellerhub-recovery-lab-title">SellerHub Recovery Boundary Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not configure a monitoring SDK,
        send production error reports, create SSR, or claim Error Boundaries catch event
        handler errors or arbitrary async callback errors.
      </p>
      <div className="recovery-grid">
        <CatalogCrashLab />
        <OrdersRetryPanel />
        <DashboardWidgetBoundary />
        <PluginIsolationPanel />
        <SuspenseErrorCompositionPanel />
        <ErrorLogPreview />
        <RecoveryDecisionTable />
      </div>
    </section>
  )
}
