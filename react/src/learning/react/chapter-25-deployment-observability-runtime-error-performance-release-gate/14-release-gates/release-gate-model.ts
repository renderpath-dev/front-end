export type ReleaseGateStatus = 'FAIL' | 'PASS' | 'UNKNOWN'

export type ReleaseGateCheck = {
  evidence: string
  name: string
  status: ReleaseGateStatus
}

export type ReleaseGateResult = {
  blockingChecks: ReleaseGateCheck[]
  ready: boolean
  status: ReleaseGateStatus
}

export function evaluateReleaseGate(checks: ReleaseGateCheck[]): ReleaseGateResult {
  const blockingChecks = checks.filter((check) => check.status !== 'PASS')

  if (checks.some((check) => check.status === 'FAIL')) {
    return {
      blockingChecks,
      ready: false,
      status: 'FAIL',
    }
  }

  if (checks.some((check) => check.status === 'UNKNOWN')) {
    return {
      blockingChecks,
      ready: false,
      status: 'UNKNOWN',
    }
  }

  return {
    blockingChecks: [],
    ready: true,
    status: 'PASS',
  }
}
