type BudgetStatus = 'pass' | 'warn' | 'fail'

type RoutePerformanceSample = {
  route: string
  javascriptKb: number
  lcpMs: number
  inpMs: number
  cls: number
}

type RoutePerformanceBudget = {
  maxJavascriptKb: number
  maxLcpMs: number
  maxInpMs: number
  maxCls: number
}

type BudgetEvaluation = {
  route: string
  status: BudgetStatus
  violations: string[]
}

const routeBudget: RoutePerformanceBudget = {
  maxJavascriptKb: 180,
  maxLcpMs: 2500,
  maxInpMs: 200,
  maxCls: 0.1,
}

const routeSamples: RoutePerformanceSample[] = [
  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },
  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },
]

function evaluateRouteBudget(
  sample: RoutePerformanceSample,
  budget: RoutePerformanceBudget,
): BudgetEvaluation {
  const violations = [
    sample.javascriptKb > budget.maxJavascriptKb ? 'javascript' : null,
    sample.lcpMs > budget.maxLcpMs ? 'lcp' : null,
    sample.inpMs > budget.maxInpMs ? 'inp' : null,
    sample.cls > budget.maxCls ? 'cls' : null,
  ].filter((value): value is string => value !== null)

  return {
    route: sample.route,
    status: violations.length === 0 ? 'pass' : violations.length === 1 ? 'warn' : 'fail',
    violations,
  }
}

export function PerformanceBudgetPanel() {
  const evaluations = routeSamples.map((sample) => evaluateRouteBudget(sample, routeBudget))

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.11 Web Vitals and performance budget</p>
      <h2>Route cost becomes a repeatable release decision</h2>
      <div className="chapter15-grid">
        {evaluations.map((evaluation) => (
          <article className="chapter15-card" key={evaluation.route}>
            <h3>{evaluation.route}</h3>
            <strong className={`chapter15-${evaluation.status}`}>{evaluation.status}</strong>
            <p>
              {evaluation.violations.length === 0
                ? 'All sample budgets passed.'
                : `Exceeded: ${evaluation.violations.join(', ')}`}
            </p>
          </article>
        ))}
      </div>
      <p className="chapter15-note">
        These static samples demonstrate the gate model; they are not real field measurements.
      </p>
    </section>
  )
}
