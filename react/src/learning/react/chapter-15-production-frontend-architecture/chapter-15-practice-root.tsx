import { ProductionArchitectureMap } from './01-production-architecture-map/production-architecture-map'
import { DesignTokenPrimitiveBoundary } from './02-design-tokens-primitive-ui/design-token-primitive-boundary'
import { AccessibleCompoundTabs } from './03-compound-accessibility-contract/accessible-compound-tabs'
import { FeaturePublicApiBoundary } from './04-feature-module-public-api/feature-public-api-boundary'
import { DependencyDirectionAudit } from './05-shared-feature-boundary/dependency-direction-audit'
import { ApiContractAdapterPanel } from './06-api-contract-adapter/api-contract-adapter-panel'
import { ErrorNormalizationPanel } from './07-error-normalization-client-boundary/error-normalization-panel'
import { FeatureFlagPermissionPanel } from './08-feature-flags-rbac-release/feature-flag-permission-panel'
import { LocaleFormattingPanel } from './09-i18n-locale-formatting/locale-formatting-panel'
import { ObservabilityEventPanel } from './10-observability-error-reporting/observability-event-panel'
import { PerformanceBudgetPanel } from './11-performance-budget-web-vitals/performance-budget-panel'
import { SecurityBoundaryPanel } from './12-security-boundary-checks/security-boundary-panel'
import { MigrationStrategyPanel } from './13-migration-strategy/migration-strategy-panel'
import { GovernanceEvidencePanel } from './14-adr-review-governance/governance-evidence-panel'
import { SellerHubProductionMap } from './15-sellerhub-production-map/sellerhub-production-map'
import { SellerHubProductionArchitectureKit } from './sellerhub-production-architecture-kit/sellerhub-production-architecture-kit'
import './chapter-15-practice.css'

export function Chapter15PracticeRoot() {
  return (
    <main className="chapter15-shell">
      <header className="chapter15-hero">
        <p className="chapter15-kicker">React Chapter 15</p>
        <h1>Production Frontend Architecture, Design System, and Governance</h1>
        <p>
          A runnable architecture lab for module contracts, delivery evidence, operational
          boundaries, and long-term change.
        </p>
      </header>

      <ProductionArchitectureMap />
      <DesignTokenPrimitiveBoundary />
      <AccessibleCompoundTabs />
      <FeaturePublicApiBoundary />
      <DependencyDirectionAudit />
      <ApiContractAdapterPanel />
      <ErrorNormalizationPanel />
      <FeatureFlagPermissionPanel />
      <LocaleFormattingPanel />
      <ObservabilityEventPanel />
      <PerformanceBudgetPanel />
      <SecurityBoundaryPanel />
      <MigrationStrategyPanel />
      <GovernanceEvidencePanel />
      <SellerHubProductionMap />
      <SellerHubProductionArchitectureKit />
    </main>
  )
}
