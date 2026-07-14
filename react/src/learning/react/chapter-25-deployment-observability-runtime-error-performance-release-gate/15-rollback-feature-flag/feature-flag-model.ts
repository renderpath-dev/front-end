export type FeatureFlagReleaseInput = {
  defaultEnabled: boolean
  disablePath?: string
  fallbackRoute?: string
  flagKey: string
  owner: string
}

export type FeatureFlagReleaseDecision = {
  blastRadius: 'contained' | 'open'
  readyForRelease: boolean
  requiredActions: string[]
}

export function evaluateFeatureFlagRelease(
  input: FeatureFlagReleaseInput,
): FeatureFlagReleaseDecision {
  const requiredActions: string[] = []

  if (!input.fallbackRoute) {
    requiredActions.push('Add a user-facing fallback route before enabling the flag.')
  }

  if (!input.disablePath) {
    requiredActions.push('Document a disable path or kill switch.')
  }

  if (input.defaultEnabled) {
    requiredActions.push('Review whether the first release should default off.')
  }

  return {
    blastRadius: requiredActions.length === 0 ? 'contained' : 'open',
    readyForRelease: requiredActions.length === 0,
    requiredActions,
  }
}
