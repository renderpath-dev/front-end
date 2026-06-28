import { CapstoneScopePanel } from './01-capstone-scope/capstone-scope-panel'
import { ProductRequirementsPanel } from './02-product-requirements/product-requirements-panel'
import { RouteUrlStatePanel } from './03-route-url-state/route-url-state-panel'
import { DesignSystemShellPanel } from './04-design-system-shell/design-system-shell-panel'
import { ApiDtoAdapterPanel } from './05-api-dto-adapter/api-dto-adapter-panel'
import { CatalogFeaturePanel } from './06-catalog-feature/catalog-feature-panel'
import { ProductDetailLifecyclePanel } from './07-product-detail-lifecycle/product-detail-lifecycle-panel'
import { CartReducerPersistencePanel } from './08-cart-reducer-persistence/cart-reducer-persistence-panel'
import { CheckoutWorkflowPanel } from './09-checkout-workflow/checkout-workflow-panel'
import { SellerOrdersRbacPanel } from './10-seller-orders-rbac/seller-orders-rbac-panel'
import { AppContextObservabilityPanel } from './11-app-context-observability/app-context-observability-panel'
import { PerformanceSecurityOperationsPanel } from './12-performance-security-operations/performance-security-operations-panel'
import { TestingStrategyPanel } from './13-testing-strategy/testing-strategy-panel'
import { DocumentationPortfolioEvidencePanel } from './14-documentation-portfolio-evidence/documentation-portfolio-evidence-panel'
import { CompleteCapstoneCodePanel } from './15-complete-capstone-code/complete-capstone-code-panel'
import { SellerHubNextStepRoadmap } from './16-next-step-roadmap/sellerhub-next-step-roadmap'
import { SellerHubCapstoneApp } from './sellerhub-capstone-app/app/sellerhub-capstone-app'
import './sellerhub-capstone-app/sellerhub-capstone-app.css'
import './chapter-16-practice.css'

export function Chapter16PracticeRoot() {
  return (
    <main className="chapter16-shell">
      <header className="chapter16-hero">
        <p className="chapter16-eyebrow">React Chapter 16</p>
        <h1>SellerHub Capstone and Production Feature Delivery</h1>
        <p>
          A local frontend capstone that connects product requirements, React behavior,
          runtime contracts, tests, release evidence, and honest production boundaries.
        </p>
      </header>

      <SellerHubCapstoneApp />

      <div className="chapter16-evidence-heading">
        <p className="chapter16-eyebrow">Mechanism evidence</p>
        <h2>Chapter 16 delivery slices</h2>
      </div>
      <CapstoneScopePanel />
      <ProductRequirementsPanel />
      <RouteUrlStatePanel />
      <DesignSystemShellPanel />
      <ApiDtoAdapterPanel />
      <CatalogFeaturePanel />
      <ProductDetailLifecyclePanel />
      <CartReducerPersistencePanel />
      <CheckoutWorkflowPanel />
      <SellerOrdersRbacPanel />
      <AppContextObservabilityPanel />
      <PerformanceSecurityOperationsPanel />
      <TestingStrategyPanel />
      <DocumentationPortfolioEvidencePanel />
      <CompleteCapstoneCodePanel />
      <SellerHubNextStepRoadmap />
    </main>
  )
}
