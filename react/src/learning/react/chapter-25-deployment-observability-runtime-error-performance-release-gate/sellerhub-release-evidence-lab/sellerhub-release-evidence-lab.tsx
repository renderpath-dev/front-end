import { AccessibilityReleaseCheckCard } from './accessibility-release-check-card'
import { AsyncObservabilityCard } from './async-observability-card'
import { BundleChunkReviewCard } from './bundle-chunk-review-card'
import { ErrorBoundaryLogPreview } from './error-boundary-log-preview'
import { IncidentTriageCard } from './incident-triage-card'
import { PerformanceMarkLab } from './performance-mark-lab'
import { ReactProfilerSamplePanel } from './react-profiler-sample-panel'
import { ReleaseGateChecklist } from './release-gate-checklist'
import { ReleaseMetadataCard } from './release-metadata-card'
import { ReleaseReadinessReviewTable } from './release-readiness-review-table'
import { RollbackDecisionPanel } from './rollback-decision-panel'
import { RuntimeErrorSimulator } from './runtime-error-simulator'
import { SecurityPrivacyReviewCard } from './security-privacy-review-card'
import { WebVitalsThresholdCard } from './web-vitals-threshold-card'

export function SellerHubReleaseEvidenceLab() {
  return (
    <section className="release-evidence-final-lab" aria-labelledby="sellerhub-release-lab-title">
      <p className="release-evidence-card__eyebrow">9.18</p>
      <h2 id="sellerhub-release-lab-title">SellerHub Release Evidence Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not deploy to production, send real
        telemetry, install monitoring SDKs, upload source maps, fake real user monitoring,
        or claim local preview and local metrics equal production behavior.
      </p>
      <div className="release-evidence-lab-grid">
        <ReleaseMetadataCard />
        <RuntimeErrorSimulator />
        <ErrorBoundaryLogPreview />
        <PerformanceMarkLab />
        <ReactProfilerSamplePanel />
        <WebVitalsThresholdCard />
        <BundleChunkReviewCard />
        <AsyncObservabilityCard />
        <AccessibilityReleaseCheckCard />
        <SecurityPrivacyReviewCard />
        <ReleaseGateChecklist />
        <RollbackDecisionPanel />
        <IncidentTriageCard />
        <ReleaseReadinessReviewTable />
      </div>
    </section>
  )
}
