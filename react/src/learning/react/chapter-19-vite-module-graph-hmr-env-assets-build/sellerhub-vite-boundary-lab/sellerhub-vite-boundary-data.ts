import type { EnvAuditEntry } from '../06-env-modes/env-mode-model'

export const moduleGraphNodes = [
  {
    edge: 'index.html -> /src/sudoku/main.tsx',
    owner: 'Vite HTML entry',
  },
  {
    edge: '/src/sudoku/main.tsx -> /src/App.tsx',
    owner: 'React root bootstrap',
  },
  {
    edge: '/src/App.tsx -> learning manifest',
    owner: 'Learning navigation module graph',
  },
  {
    edge: 'learning manifest -> chapter lazy imports',
    owner: 'Route-level chunk boundary',
  },
] as const

export const hmrLifecycleSteps = [
  'Edit a source module during dev.',
  'Vite locates an HMR boundary.',
  'dispose runs for persistent side effects.',
  'React Fast Refresh evaluates component compatibility.',
  'The browser updates the module or performs a full reload.',
] as const

export const envAuditEntries: EnvAuditEntry[] = [
  {
    exampleValue: 'https://api.example.test',
    key: 'VITE_PUBLIC_API_BASE',
    purpose: 'Public client API origin',
  },
  {
    exampleValue: 'hidden from client',
    key: 'DATABASE_PASSWORD',
    purpose: 'Server-only database credential',
  },
  {
    exampleValue: 'do not ship',
    key: 'VITE_PRIVATE_TOKEN',
    purpose: 'Unsafe public prefix example',
  },
]

export const deploymentDecisionRows = [
  ['Root path deployment', 'Keep base as / and verify deep-link fallback'],
  ['Nested path deployment', 'Set base to the nested public path before build'],
  ['Preview check', 'Use vite preview to inspect dist locally only'],
  ['Static host check', 'Configure 404 fallback for browser routes'],
] as const

export const toolingReviewItems = [
  'No secret value uses the VITE_ prefix.',
  'Dynamic imports use analyzable relative paths.',
  'Glob patterns are literals and scoped to content.',
  'Workers terminate after computation or component cleanup.',
  'Config customization has evidence before being added.',
  'SSR and backend integration remain documented boundaries.',
] as const
