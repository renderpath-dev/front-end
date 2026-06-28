export type SellerHubRole = 'buyer' | 'seller' | 'viewer'

export type SellerHubFeatureFlags = {
  sellerOrderMutation: boolean
  operationsPanel: boolean
}

export const defaultSellerHubFeatureFlags: SellerHubFeatureFlags = {
  sellerOrderMutation: true,
  operationsPanel: true,
}

export function canUpdateOrderStatus(
  role: SellerHubRole,
  flags: SellerHubFeatureFlags,
): boolean {
  return role === 'seller' && flags.sellerOrderMutation
}
