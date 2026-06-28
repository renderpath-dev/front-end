export type SecurityBoundary = {
  id: string
  frontendControl: string
  finding: 'pass' | 'review'
  serverRequirement: string
}

export const sellerHubSecurityBoundaries: readonly SecurityBoundary[] = [
  {
    id: 'safe-external-link',
    finding: 'pass',
    frontendControl: 'No untrusted external navigation is rendered in this capstone.',
    serverRequirement: 'Validate redirect destinations at the trusted request boundary.',
  },
  {
    id: 'unsafe-html',
    finding: 'pass',
    frontendControl: 'Render text through JSX and do not use dangerouslySetInnerHTML.',
    serverRequirement: 'Sanitize any future rich text before it reaches clients.',
  },
  {
    id: 'token-storage',
    finding: 'review',
    frontendControl: 'Do not store authentication tokens in localStorage.',
    serverRequirement: 'Use an approved session design with secure cookie controls.',
  },
  {
    id: 'sensitive-logging',
    finding: 'pass',
    frontendControl: 'Error events contain codes and context but no form values.',
    serverRequirement: 'Apply central redaction and retention controls.',
  },
  {
    id: 'server-authorization',
    finding: 'review',
    frontendControl: 'Hide unavailable order actions for the active role.',
    serverRequirement: 'Authorize every order mutation independently.',
  },
]
