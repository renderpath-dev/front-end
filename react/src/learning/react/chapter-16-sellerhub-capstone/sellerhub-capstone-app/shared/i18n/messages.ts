export type SellerHubLocale = 'en-US' | 'en-GB'

type SellerHubMessages = {
  catalogTitle: string
  cartTitle: string
  checkoutTitle: string
  ordersTitle: string
}

export const sellerHubMessages: Record<SellerHubLocale, SellerHubMessages> = {
  'en-US': {
    catalogTitle: 'Product catalog',
    cartTitle: 'Shopping cart',
    checkoutTitle: 'Checkout',
    ordersTitle: 'Seller orders',
  },
  'en-GB': {
    catalogTitle: 'Product catalogue',
    cartTitle: 'Shopping basket',
    checkoutTitle: 'Checkout',
    ordersTitle: 'Seller orders',
  },
}
