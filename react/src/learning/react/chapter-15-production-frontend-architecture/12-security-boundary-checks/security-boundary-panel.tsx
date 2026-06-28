type SecurityFinding = {
  check: string
  status: 'pass' | 'fail'
  evidence: string
}

function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function inspectSecurityBoundary(input: {
  externalUrl: string
  rendersRawHtml: boolean
  storesAccessToken: boolean
  loggedFields: string[]
}): SecurityFinding[] {
  const sensitiveLogFields = new Set(['accessToken', 'password', 'sessionId'])
  const leakedFields = input.loggedFields.filter((field) => sensitiveLogFields.has(field))

  return [
    {
      check: 'Safe external URL',
      status: isSafeExternalUrl(input.externalUrl) ? 'pass' : 'fail',
      evidence: input.externalUrl,
    },
    {
      check: 'Unsafe HTML boundary',
      status: input.rendersRawHtml ? 'fail' : 'pass',
      evidence: input.rendersRawHtml ? 'Raw HTML requested' : 'React text rendering retained',
    },
    {
      check: 'Token storage boundary',
      status: input.storesAccessToken ? 'fail' : 'pass',
      evidence: input.storesAccessToken ? 'Access token in browser storage' : 'No token stored',
    },
    {
      check: 'Sensitive logging boundary',
      status: leakedFields.length === 0 ? 'pass' : 'fail',
      evidence: leakedFields.length === 0 ? 'No sensitive keys' : leakedFields.join(', '),
    },
  ]
}

export function SecurityBoundaryPanel() {
  const findings = inspectSecurityBoundary({
    externalUrl: 'https://seller.example/catalog-policy',
    rendersRawHtml: false,
    storesAccessToken: false,
    loggedFields: ['release', 'route', 'errorCode'],
  })

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.12 Security boundaries</p>
      <h2>Security checks connect browser sinks to reviewable evidence</h2>
      <ul className="chapter15-list">
        {findings.map((finding) => (
          <li key={finding.check}>
            <strong>{finding.check}</strong>
            <span className={`chapter15-${finding.status}`}>{finding.status}</span>
            <code>{finding.evidence}</code>
          </li>
        ))}
      </ul>
      <a
        className="chapter15-link"
        href="https://example.com/security"
        rel="noopener noreferrer"
        target="_blank"
      >
        Open security policy example
      </a>
    </section>
  )
}
