export type PerformanceBudget = {
  metric: 'initial-js-kb' | 'catalog-interaction-ms' | 'route-chunk-kb'
  limit: number
  observed: number
  route: '/react/chapter-16' | '/react/chapter-16/catalog' | '/react/chapter-16/seller/orders'
  unit: 'KB' | 'ms'
}

export const sellerHubPerformanceBudgets: readonly PerformanceBudget[] = [
  {
    metric: 'initial-js-kb',
    limit: 250,
    observed: 198,
    route: '/react/chapter-16',
    unit: 'KB',
  },
  {
    metric: 'catalog-interaction-ms',
    limit: 100,
    observed: 42,
    route: '/react/chapter-16/catalog',
    unit: 'ms',
  },
  {
    metric: 'route-chunk-kb',
    limit: 80,
    observed: 64,
    route: '/react/chapter-16/seller/orders',
    unit: 'KB',
  },
]

export function passesPerformanceBudget(budget: PerformanceBudget): boolean {
  return budget.observed <= budget.limit
}
