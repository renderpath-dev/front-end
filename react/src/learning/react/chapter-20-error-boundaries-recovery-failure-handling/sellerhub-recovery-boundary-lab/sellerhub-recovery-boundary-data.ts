export type RecoveryDecision = {
  boundary: string
  failure: string
  recovery: string
  owner: string
}

export type ErrorLogEntry = {
  id: string
  boundary: string
  message: string
  componentStack: string
  status: 'captured' | 'queued'
}

export const recoveryDecisions: RecoveryDecision[] = [
  {
    boundary: 'Catalog card',
    failure: 'Render crash from malformed listing data',
    recovery: 'Reset the card after the invalid listing is removed',
    owner: 'Widget boundary',
  },
  {
    boundary: 'Orders panel',
    failure: 'Request rejection or invalid response',
    recovery: 'Keep request state in the panel and offer retry',
    owner: 'Async owner',
  },
  {
    boundary: 'Dashboard chart',
    failure: 'Third-party chart throws during render',
    recovery: 'Replace only the chart with a fallback card',
    owner: 'Widget boundary',
  },
  {
    boundary: 'Route shell',
    failure: 'Route body throws before page content commits',
    recovery: 'Preserve global navigation and reset on route key change',
    owner: 'Route boundary',
  },
]

export const initialErrorLogEntries: ErrorLogEntry[] = [
  {
    id: 'log-001',
    boundary: 'Catalog card',
    message: 'Listing price formatter failed',
    componentStack: 'at CatalogMetricCard > at CatalogCrashLab',
    status: 'captured',
  },
]
