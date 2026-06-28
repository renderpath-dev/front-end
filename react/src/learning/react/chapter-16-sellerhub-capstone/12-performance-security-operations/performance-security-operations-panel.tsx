import {
  passesPerformanceBudget,
  sellerHubPerformanceBudgets,
} from '../sellerhub-capstone-app/shared/performance/performance-budget'
import { sellerHubSecurityBoundaries } from '../sellerhub-capstone-app/shared/security/security-boundaries'

export function PerformanceSecurityOperationsPanel() {
  const passedBudgets = sellerHubPerformanceBudgets.filter(
    passesPerformanceBudget,
  ).length

  return (
    <section className="chapter16-panel" aria-labelledby="operations-evidence-title">
      <p className="chapter16-eyebrow">9.12 Performance, security, and operations</p>
      <h2 id="operations-evidence-title">Replace production adjectives with thresholds</h2>
      <dl className="chapter16-definition-list">
        <div>
          <dt>Performance</dt>
          <dd>
            {passedBudgets}/{sellerHubPerformanceBudgets.length} local budgets pass
          </dd>
        </div>
        <div>
          <dt>Security</dt>
          <dd>{sellerHubSecurityBoundaries.length} trust boundaries documented</dd>
        </div>
      </dl>
    </section>
  )
}
