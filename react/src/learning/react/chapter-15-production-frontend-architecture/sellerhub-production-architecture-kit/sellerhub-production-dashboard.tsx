import { useState } from 'react'
import type { CompoundTabDefinition } from './design-system/compound-tabs'
import { CompoundTabs } from './design-system/compound-tabs'
import { PrimitiveButton } from './design-system/primitive-button'
import { catalogFeatureApi } from './features/catalog/catalog-public-api'
import { ordersFeatureApi } from './features/orders/orders-public-api'
import type { SellerOrder } from './features/orders/orders-public-api'
import { isCatalogProductDto } from './shared/api/sellerhub-api-contract'
import {
  evaluateCapability,
  sellerHubFlags,
} from './shared/flags/feature-flags'
import type { SellerPermission } from './shared/flags/feature-flags'
import { sellerHubMessages } from './shared/i18n/messages'
import type { Locale } from './shared/i18n/messages'
import { createErrorReporter } from './shared/observability/error-reporter'
import {
  evaluatePerformanceBudget,
  sellerHubRouteBudget,
} from './shared/performance/performance-budget'
import {
  inspectSecurityBoundaries,
  safeExternalLinkProps,
} from './shared/security/security-boundaries'

const productResponse: unknown = {
  product_id: 'product-901',
  display_name: 'Seller Work Desk',
  price_cents: 24900,
  stock_count: 38,
}

const sellerOrder: SellerOrder = {
  id: 'order-2048',
  totalInCents: 18450,
  placedAt: new Date('2026-06-25T08:30:00.000Z'),
  status: 'packing',
}

const routeSamples = [
  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },
  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },
]

export function SellerHubProductionDashboard() {
  const [activeTabId, setActiveTabId] = useState('architecture')
  const [locale, setLocale] = useState<Locale>('en-US')
  const [role, setRole] = useState<'viewer' | 'seller-admin'>('viewer')
  const [reportRevision, setReportRevision] = useState(0)
  const [errorReporter] = useState(createErrorReporter)
  const messages = sellerHubMessages[locale]
  const permissions: SellerPermission[] =
    role === 'seller-admin'
      ? ['checkout:preview', 'checkout:publish', 'analytics:view']
      : ['checkout:preview']
  const checkoutDecision = evaluateCapability({
    flagKey: 'checkout-v2',
    flags: sellerHubFlags,
    permissions,
    requiredPermission: 'checkout:publish',
  })
  const productViewModel = isCatalogProductDto(productResponse)
    ? catalogFeatureApi.mapProduct(productResponse, locale)
    : null
  const orderViewModel = ordersFeatureApi.toViewModel(sellerOrder, locale)
  const budgetResults = routeSamples.map((sample) =>
    evaluatePerformanceBudget(sample, sellerHubRouteBudget),
  )
  const securityFindings = inspectSecurityBoundaries({
    externalUrl: 'https://seller.example/policy',
    rendersRawHtml: false,
    storesAccessToken: false,
    loggedFields: ['release', 'route', 'feature', 'errorCode'],
  })
  const policyLink = safeExternalLinkProps('https://example.com/seller-policy')
  const errorEvents = errorReporter.getEvents()

  function reportMockError(): void {
    errorReporter.report(new Error('Orders summary unavailable.'), {
      route: '/seller/orders',
      feature: 'orders-summary',
      release: 'sellerhub-2026.06',
      sessionReference: 'anonymous-session',
    })
    setReportRevision((currentRevision) => currentRevision + 1)
  }

  const tabs: CompoundTabDefinition[] = [
    {
      id: 'architecture',
      label: 'Architecture',
      content: (
        <div className="chapter15-grid">
          <article className="chapter15-card">
            <h3>{messages.catalogTitle}</h3>
            {productViewModel ? (
              <>
                <strong>{productViewModel.title}</strong>
                <p>{productViewModel.priceLabel}</p>
                <p>{productViewModel.stockLabel}</p>
                <code>{catalogFeatureApi.productRoute(productViewModel.id)}</code>
              </>
            ) : (
              <p>Catalog contract rejected.</p>
            )}
          </article>
          <article className="chapter15-card">
            <h3>{messages.ordersTitle}</h3>
            <strong>{orderViewModel.id}</strong>
            <p>{orderViewModel.totalLabel}</p>
            <p>
              {orderViewModel.placedLabel} | {orderViewModel.statusLabel}
            </p>
          </article>
          <article className="chapter15-card">
            <h3>Capability boundary</h3>
            <p>{checkoutDecision.reason}</p>
            <strong className={checkoutDecision.visible ? 'chapter15-pass' : 'chapter15-warn'}>
              {checkoutDecision.visible ? 'Publish visible' : 'Publish hidden'}
            </strong>
          </article>
        </div>
      ),
    },
    {
      id: 'operations',
      label: 'Operations',
      content: (
        <div className="chapter15-grid">
          {budgetResults.map((result) => (
            <article className="chapter15-card" key={result.route}>
              <h3>{result.route}</h3>
              <strong className={`chapter15-${result.status}`}>{result.status}</strong>
              <p>
                {result.violations.length === 0
                  ? 'Performance budget passed.'
                  : `Exceeded: ${result.violations.join(', ')}`}
              </p>
            </article>
          ))}
          <article className="chapter15-card" data-report-revision={reportRevision}>
            <h3>Error reports</h3>
            <p>{errorEvents.length} mock event(s)</p>
            <PrimitiveButton onClick={reportMockError}>Report mock error</PrimitiveButton>
            {errorEvents[0] ? (
              <code>
                {errorEvents[0].release} | {errorEvents[0].route} |{' '}
                {errorEvents[0].feature}
              </code>
            ) : null}
          </article>
        </div>
      ),
    },
    {
      id: 'governance',
      label: 'Governance',
      content: (
        <div className="chapter15-grid">
          <article className="chapter15-card">
            <h3>ADR-001</h3>
            <p>Feature public APIs and design-system dependency direction are accepted.</p>
          </article>
          <article className="chapter15-card">
            <h3>Migration</h3>
            <p>Inventory, compatibility, migration, retirement, and rollback are defined.</p>
          </article>
          <article className="chapter15-card">
            <h3>Review gate</h3>
            <p>State, effects, accessibility, tests, performance, and security require evidence.</p>
          </article>
          <article className="chapter15-card">
            <h3>Security findings</h3>
            <p>
              {securityFindings.filter((finding) => finding.status === 'pass').length}/
              {securityFindings.length} checks passed.
            </p>
            {policyLink ? (
              <a className="chapter15-link" {...policyLink}>
                Seller policy
              </a>
            ) : null}
          </article>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="chapter15-actions">
        <label className="chapter15-control">
          Locale
          <select
            onChange={(event) => setLocale(event.currentTarget.value as Locale)}
            value={locale}
          >
            <option value="en-US">en-US</option>
            <option value="en-GB">en-GB</option>
          </select>
        </label>
        <label className="chapter15-control">
          Role
          <select
            onChange={(event) =>
              setRole(event.currentTarget.value as 'viewer' | 'seller-admin')
            }
            value={role}
          >
            <option value="viewer">viewer</option>
            <option value="seller-admin">seller-admin</option>
          </select>
        </label>
        <PrimitiveButton tone="quiet">{messages.releaseTitle}</PrimitiveButton>
      </div>
      <CompoundTabs
        activeId={activeTabId}
        ariaLabel="SellerHub production architecture"
        onChange={setActiveTabId}
        tabs={tabs}
      />
      <p className="chapter15-note">
        UI permission is not server authorization. Metrics and reports are local mock evidence.
      </p>
    </div>
  )
}
