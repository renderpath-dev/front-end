export type ServerRuleStatus = 'allowed' | 'blocked'

export type ServerComponentRule = {
  capability: string
  status: ServerRuleStatus
  reason: string
}

export const serverComponentRules: ServerComponentRule[] = [
  {
    capability: 'Fetch product data before sending UI',
    status: 'allowed',
    reason: 'Server Components run during server rendering and can await server data.',
  },
  {
    capability: 'Read browser localStorage during render',
    status: 'blocked',
    reason: 'The browser storage object exists only in the browser runtime.',
  },
  {
    capability: 'Register an onClick handler',
    status: 'blocked',
    reason: 'Event handlers require client JavaScript and a hydrated browser tree.',
  },
  {
    capability: 'Use component state with useState',
    status: 'blocked',
    reason: 'Server Component output is a render result, not an interactive component instance.',
  },
  {
    capability: 'Render a Client Component boundary',
    status: 'allowed',
    reason: 'Server output can include a reference to a Client Component entry point.',
  },
]

export function countBlockedServerRules(rules: ServerComponentRule[]): number {
  return rules.filter((rule) => rule.status === 'blocked').length
}
