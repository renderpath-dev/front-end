export type SellerHubProduct = {
  id: string
  name: string
  channel: 'online' | 'retail' | 'partner'
  margin: number
}

export type SellerHubOrder = {
  id: string
  customer: string
  status: 'open' | 'packed' | 'delayed'
}

export const sellerHubProducts: SellerHubProduct[] = [
  { id: 'product-201', name: 'Route-aware desk lamp', channel: 'online', margin: 38 },
  { id: 'product-202', name: 'Nested outlet organizer', channel: 'retail', margin: 24 },
  { id: 'product-203', name: 'Hash fallback label kit', channel: 'partner', margin: 31 },
]

export const sellerHubOrders: SellerHubOrder[] = [
  { id: 'order-501', customer: 'Aster Studio', status: 'open' },
  { id: 'order-502', customer: 'Northwind Market', status: 'packed' },
  { id: 'order-503', customer: 'Frame & Co.', status: 'delayed' },
]

export const sellerHubRouteReviewRows = [
  {
    route: '/sellerhub/catalog',
    owner: 'pathname',
    evidence: 'Catalog page identity is owned by the URL path.',
  },
  {
    route: '/sellerhub/catalog/:productId',
    owner: 'route param',
    evidence: 'Product detail reads an entity id from a dynamic segment.',
  },
  {
    route: '/sellerhub/catalog?channel=online',
    owner: 'search params',
    evidence: 'Catalog filter is shareable and bookmarkable URL state.',
  },
  {
    route: '/sellerhub/settings',
    owner: 'protected route boundary',
    evidence: 'Client auth state gates UI only; server authorization is separate.',
  },
]
