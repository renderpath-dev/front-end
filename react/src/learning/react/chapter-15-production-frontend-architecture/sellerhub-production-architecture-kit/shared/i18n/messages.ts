export type Locale = 'en-US' | 'en-GB'
export type MessageKey = 'catalogTitle' | 'ordersTitle' | 'releaseTitle'

export const sellerHubMessages: Record<Locale, Record<MessageKey, string>> = {
  'en-US': {
    catalogTitle: 'Catalog',
    ordersTitle: 'Seller orders',
    releaseTitle: 'Release readiness',
  },
  'en-GB': {
    catalogTitle: 'Catalogue',
    ordersTitle: 'Seller orders',
    releaseTitle: 'Release readiness',
  },
}
