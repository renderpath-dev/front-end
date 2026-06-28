export type SecurityFinding = {
  check: string
  status: 'pass' | 'fail'
  evidence: string
}

export function safeExternalLinkProps(urlValue: string): {
  href: string
  rel: 'noopener noreferrer'
  target: '_blank'
} | null {
  try {
    const url = new URL(urlValue)
    if (url.protocol !== 'https:') {
      return null
    }

    return {
      href: url.toString(),
      rel: 'noopener noreferrer',
      target: '_blank',
    }
  } catch {
    return null
  }
}

export function inspectSecurityBoundaries(input: {
  externalUrl: string
  rendersRawHtml: boolean
  storesAccessToken: boolean
  loggedFields: string[]
}): SecurityFinding[] {
  const sensitiveKeys = new Set(['accessToken', 'password', 'sessionId'])
  const loggedSensitiveKeys = input.loggedFields.filter((field) => sensitiveKeys.has(field))

  return [
    {
      check: 'External link',
      status: safeExternalLinkProps(input.externalUrl) === null ? 'fail' : 'pass',
      evidence: input.externalUrl,
    },
    {
      check: 'Raw HTML',
      status: input.rendersRawHtml ? 'fail' : 'pass',
      evidence: input.rendersRawHtml ? 'Unsafe HTML requested' : 'Text rendering retained',
    },
    {
      check: 'Token storage',
      status: input.storesAccessToken ? 'fail' : 'pass',
      evidence: input.storesAccessToken ? 'Browser storage used' : 'No access token stored',
    },
    {
      check: 'Sensitive logging',
      status: loggedSensitiveKeys.length === 0 ? 'pass' : 'fail',
      evidence:
        loggedSensitiveKeys.length === 0 ? 'No sensitive keys' : loggedSensitiveKeys.join(', '),
    },
  ]
}
