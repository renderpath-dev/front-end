export type PerformanceBudgetStatus = 'pass' | 'warn' | 'fail'

export type RoutePerformanceSample = {
  route: string
  javascriptKb: number
  lcpMs: number
  inpMs: number
  cls: number
}

export type RoutePerformanceBudget = {
  maxJavascriptKb: number
  maxLcpMs: number
  maxInpMs: number
  maxCls: number
}

export type PerformanceBudgetResult = {
  route: string
  status: PerformanceBudgetStatus
  violations: string[]
}

export const sellerHubRouteBudget: RoutePerformanceBudget = {
  maxJavascriptKb: 180,
  maxLcpMs: 2500,
  maxInpMs: 200,
  maxCls: 0.1,
}

export function evaluatePerformanceBudget(
  sample: RoutePerformanceSample,
  budget: RoutePerformanceBudget,
): PerformanceBudgetResult {
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
