export type FeatureFlagKey = 'checkout-v2' | 'seller-analytics'
export type SellerPermission = 'checkout:preview' | 'checkout:publish' | 'analytics:view'

export type FeatureFlag = {
  enabled: boolean
  owner: string
  cleanupDate: string
}

export type CapabilityDecision = {
  visible: boolean
  reason: string
}

export const sellerHubFlags: Record<FeatureFlagKey, FeatureFlag> = {
  'checkout-v2': {
    enabled: true,
    owner: 'checkout-team',
    cleanupDate: '2026-09-30',
  },
  'seller-analytics': {
    enabled: false,
    owner: 'seller-platform',
    cleanupDate: '2026-08-15',
  },
}

export function evaluateCapability(input: {
  flagKey: FeatureFlagKey
  flags: Record<FeatureFlagKey, FeatureFlag>
  permissions: SellerPermission[]
  requiredPermission: SellerPermission
}): CapabilityDecision {
  if (!input.flags[input.flagKey].enabled) {
    return { visible: false, reason: 'Release flag is disabled.' }
  }

  if (!input.permissions.includes(input.requiredPermission)) {
    return { visible: false, reason: 'UI permission is missing.' }
  }

  return { visible: true, reason: 'Flag and UI permission allow the capability.' }
}
