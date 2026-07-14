import { TestingBoundaryMap } from './01-test-boundary/testing-boundary-map'
import { VisibleSummaryPanel } from './03-component-render-screen/visible-summary-panel'
import { AccessibleLoginForm } from './04-accessible-queries/accessible-login-form'
import { QuantityStepper } from './05-user-event-interaction/quantity-stepper'
import { AsyncOrderStatusPanel } from './06-async-ui-state/async-order-status-panel'
import { SellerFilterForm } from './07-controlled-form-test/seller-filter-form'
import { SellerRouteWorkspace } from './08-router-integration-test/seller-route-workspace'
import { SellerPreferencesProvider } from './09-context-hook-boundary/seller-preferences-provider'
import { SellerPreferenceSummary } from './09-context-hook-boundary/seller-preference-summary'
import { SellerOrdersNetworkPanel } from './10-msw-network-mock/seller-orders-network-panel'
import { qualityGateCommands } from './12-quality-gates/quality-gate-command-model'
import { SellerAuthProvider } from './sellerhub-tested-workflow/sellerhub-auth-provider'
import { SellerHubCatalogFilter } from './sellerhub-tested-workflow/sellerhub-catalog-filter'
import { SellerHubLoginForm } from './sellerhub-tested-workflow/sellerhub-login-form'
import './chapter-12-practice.css'

const sampleOrders = [{ id: 'order-preview', label: 'Preview order' }]

export function Chapter12PracticeRoot() {
  return (
    <main className="chapter-twelve-shell">
      <header className="chapter-twelve-header">
        <p className="chapter-twelve-eyebrow">React Chapter 12</p>
        <h1>Testing, Quality Gates, and Frontend Engineering</h1>
        <p>
          Practice the boundary between user-visible behavior, pure business rules,
          React rendering, jsdom, MSW, TypeScript, and repeatable quality gates.
        </p>
      </header>

      <TestingBoundaryMap />
      <VisibleSummaryPanel hasErrors={false} orderCount={2} productCount={5} />
      <AccessibleLoginForm errorMessage="Invalid credentials" />
      <QuantityStepper initialQuantity={1} maxQuantity={5} />
      <AsyncOrderStatusPanel loadOrders={() => Promise.resolve(sampleOrders)} />
      <SellerFilterForm onApply={() => {}} />

      <SellerRouteWorkspace isAuthenticated location="/seller/orders/1001" />

      <SellerPreferencesProvider value={{ compactMode: true, currency: 'USD' }}>
        <SellerPreferenceSummary />
      </SellerPreferencesProvider>

      <SellerOrdersNetworkPanel />

      <section className="practice-panel" aria-labelledby="quality-gates-title">
        <p className="skill-pill">Quality gates</p>
        <h2 id="quality-gates-title">Command model</h2>
        <ol className="quality-gate-list">
          {qualityGateCommands.map((command) => (
            <li key={command.name}>
              <code>{command.command}</code>
              <span>{command.verifies}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="practice-panel" aria-labelledby="sellerhub-workflow-title">
        <p className="skill-pill">Final mini project</p>
        <h2 id="sellerhub-workflow-title">SellerHub Tested Workflow</h2>
        <SellerAuthProvider>
          <div className="workflow-grid">
            <SellerHubCatalogFilter onApply={() => {}} />
            <SellerHubLoginForm onSubmit={() => {}} />
          </div>
        </SellerAuthProvider>
      </section>
    </main>
  )
}
