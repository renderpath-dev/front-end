import { ReleaseReadinessBoundaryPanel } from './01-release-readiness/release-readiness-boundary-panel'
import { BuildArtifactEvidencePanel } from './02-build-artifact/build-artifact-evidence-panel'
import { RuntimeConfigEvidencePanel } from './03-runtime-config/runtime-config-evidence-panel'
import { RuntimeErrorBoundaryPanel } from './04-runtime-errors/runtime-error-boundary-panel'
import { ErrorClassificationPanel } from './05-error-classification/error-classification-panel'
import { SourceMapBoundaryPanel } from './06-source-map/source-map-boundary-panel'
import { PerformanceApiMeasurePanel } from './07-performance-api/performance-api-measure-panel'
import { ReactProfilerBoundaryPanel } from './08-react-profiler/react-profiler-boundary-panel'
import { WebVitalsBoundaryPanel } from './09-web-vitals/web-vitals-boundary-panel'
import { BundleChunkReviewPanel } from './10-bundle-chunk-review/bundle-chunk-review-panel'
import { AsyncObservabilityPanel } from './11-async-observability/async-observability-panel'
import { AccessibilityReleaseEvidencePanel } from './12-accessibility-release/accessibility-release-evidence-panel'
import { SecurityPrivacyBoundaryPanel } from './13-security-privacy/security-privacy-boundary-panel'
import { ReleaseGatePanel } from './14-release-gates/release-gate-panel'
import { RollbackFeatureFlagPanel } from './15-rollback-feature-flag/rollback-feature-flag-panel'
import { IncidentTriagePanel } from './16-incident-triage/incident-triage-panel'
import { SellerHubReleaseReadinessMap } from './17-sellerhub-release-map/sellerhub-release-readiness-map'
import { SellerHubReleaseEvidenceLab } from './sellerhub-release-evidence-lab/sellerhub-release-evidence-lab'
import './chapter-25-practice.css'

export function Chapter25PracticeRoot() {
  return (
    <main className="release-evidence-lab-page">
      <section className="release-evidence-hero" aria-labelledby="chapter-25-title">
        <p className="release-evidence-card__eyebrow">React Chapter 25</p>
        <h1 id="chapter-25-title">
          Deployment Observability, Runtime Error, Performance Evidence, and Release Gate
        </h1>
        <p>
          Practice release-readiness evidence in a local Vite React lab. The page covers
          build artifact evidence, runtime config, sanitized diagnostics, source map
          boundaries, performance marks, Profiler samples, Web Vitals threshold models,
          release gates, rollback, and incident triage without production telemetry.
        </p>
        <div className="release-evidence-pill-row" aria-label="Chapter 25 boundaries">
          <span>Client-side Vite lab</span>
          <span>No production deployment</span>
          <span>No monitoring SDK</span>
          <span>No real telemetry</span>
          <span>No source map upload</span>
        </div>
      </section>

      <div className="release-evidence-grid">
        <ReleaseReadinessBoundaryPanel />
        <BuildArtifactEvidencePanel />
        <RuntimeConfigEvidencePanel />
        <RuntimeErrorBoundaryPanel />
        <ErrorClassificationPanel />
        <SourceMapBoundaryPanel />
        <PerformanceApiMeasurePanel />
        <ReactProfilerBoundaryPanel />
        <WebVitalsBoundaryPanel />
        <BundleChunkReviewPanel />
        <AsyncObservabilityPanel />
        <AccessibilityReleaseEvidencePanel />
        <SecurityPrivacyBoundaryPanel />
        <ReleaseGatePanel />
        <RollbackFeatureFlagPanel />
        <IncidentTriagePanel />
        <SellerHubReleaseReadinessMap />
      </div>

      <SellerHubReleaseEvidenceLab />
    </main>
  )
}
