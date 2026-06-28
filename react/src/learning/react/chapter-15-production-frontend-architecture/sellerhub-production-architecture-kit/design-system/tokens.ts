export const sellerHubTokens = {
  color: {
    action: '#0f766e',
    actionHover: '#115e59',
    danger: '#b42318',
    surface: '#ffffff',
    surfaceMuted: '#eef9f7',
    text: '#17302f',
  },
  radius: {
    control: 6,
    panel: 8,
  },
  space: {
    controlBlock: 9,
    controlInline: 14,
    panel: 20,
  },
} as const

export type SellerHubTokenSet = typeof sellerHubTokens
