import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import {
  passesPerformanceBudget,
  sellerHubPerformanceBudgets,
} from '../../shared/performance/performance-budget'
import { sellerHubSecurityBoundaries } from '../../shared/security/security-boundaries'

export function OperationsPage() {
  const {
    errorReporter,
    errorRevision,
    flags,
    release,
    reportError,
  } = useSellerHubApp()
  const events = errorReporter.read()

  return (
    <section aria-labelledby="sellerhub-operations-title">
      <p className="sellerhub-eyebrow">Release evidence</p>
      <h2 id="sellerhub-operations-title">Operations and boundaries</h2>
      <p>
        Release {release.version} keeps performance, security, observability, and flags
        visible as engineering evidence.
      </p>

      <div className="sellerhub-evidence-grid">
        <article className="sellerhub-card">
          <h3>Performance budgets</h3>
          <ul>
            {sellerHubPerformanceBudgets.map((budget) => (
              <li key={budget.metric}>
                <strong>{budget.metric}</strong>
                <span>{budget.route}</span>
                <span>
                  {budget.observed}/{budget.limit} {budget.unit}
                </span>
                <span>{passesPerformanceBudget(budget) ? 'PASS' : 'FAIL'}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="sellerhub-card">
          <h3>Security boundaries</h3>
          <ul>
            {sellerHubSecurityBoundaries.map((boundary) => (
              <li key={boundary.id}>
                <strong>{boundary.id}</strong>
                <span>{boundary.finding.toUpperCase()}</span>
                <span>{boundary.frontendControl}</span>
                <small>{boundary.serverRequirement}</small>
              </li>
            ))}
          </ul>
        </article>

        <article className="sellerhub-card">
          <h3>Observability</h3>
          <p aria-live="polite">
            {events.length} normalized error events, revision {errorRevision}.
          </p>
          {events.at(-1) && (
            <dl className="sellerhub-definition-list">
              <div>
                <dt>Route</dt>
                <dd>{events.at(-1)?.route}</dd>
              </div>
              <div>
                <dt>Feature</dt>
                <dd>{events.at(-1)?.feature}</dd>
              </div>
              <div>
                <dt>Release</dt>
                <dd>{events.at(-1)?.release}</dd>
              </div>
              <div>
                <dt>Privacy</dt>
                <dd>{events.at(-1)?.privacy}</dd>
              </div>
            </dl>
          )}
          <PrimitiveButton
            onClick={() =>
              reportError(
                'operations-smoke-test',
                normalizeSellerHubError({
                  status: 503,
                  code: 'SMOKE_TEST',
                  message: 'Local smoke-test event',
                }),
              )
            }
            tone="secondary"
          >
            Report local smoke event
          </PrimitiveButton>
        </article>

        <article className="sellerhub-card">
          <h3>Feature flags</h3>
          <dl className="sellerhub-definition-list">
            <div>
              <dt>Order mutation</dt>
              <dd>{String(flags.sellerOrderMutation)}</dd>
            </div>
            <div>
              <dt>Operations panel</dt>
              <dd>{String(flags.operationsPanel)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}
