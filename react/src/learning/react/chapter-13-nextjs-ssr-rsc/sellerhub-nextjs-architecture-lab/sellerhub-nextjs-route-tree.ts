export type SellerHubRouteKind =
  | 'layout'
  | 'page'
  | 'loading'
  | 'error'
  | 'not-found'
  | 'route-handler'
  | 'proxy'
  | 'metadata'

export type SellerHubRouteNode = {
  conceptualPath: string
  kind: SellerHubRouteKind
  owner: string
  boundary: string
}

export const sellerHubRouteTree: SellerHubRouteNode[] = [
  {
    conceptualPath: 'app/layout.tsx',
    kind: 'layout',
    owner: 'Server Component',
    boundary: 'Application shell and shared metadata defaults.',
  },
  {
    conceptualPath: 'app/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Public landing route.',
  },
  {
    conceptualPath: 'app/catalog/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Initial product list fetch and serialized filter defaults.',
  },
  {
    conceptualPath: 'app/catalog/loading.tsx',
    kind: 'loading',
    owner: 'Route segment',
    boundary: 'Instant pending UI while catalog content streams.',
  },
  {
    conceptualPath: 'app/catalog/error.tsx',
    kind: 'error',
    owner: 'Client Component',
    boundary: 'Unexpected catalog segment fallback and retry.',
  },
  {
    conceptualPath: 'app/catalog/[productId]/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Dynamic product route with productId params.',
  },
  {
    conceptualPath: 'app/catalog/[productId]/not-found.tsx',
    kind: 'not-found',
    owner: 'Route segment',
    boundary: 'Missing product UI.',
  },
  {
    conceptualPath: 'app/seller/layout.tsx',
    kind: 'layout',
    owner: 'Server Component',
    boundary: 'Seller workspace shell and nested route outlet.',
  },
  {
    conceptualPath: 'app/seller/orders/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Initial seller orders fetch and serialized summary props.',
  },
  {
    conceptualPath: 'app/checkout/page.tsx',
    kind: 'page',
    owner: 'Client Component island',
    boundary: 'Checkout form draft and event handlers.',
  },
  {
    conceptualPath: 'app/login/page.tsx',
    kind: 'page',
    owner: 'Client Component island',
    boundary: 'Login form interaction and redirect target.',
  },
  {
    conceptualPath: 'app/api/orders/route.ts',
    kind: 'route-handler',
    owner: 'BFF route boundary',
    boundary: 'Request and Response API for order data.',
  },
  {
    conceptualPath: 'proxy.ts',
    kind: 'proxy',
    owner: 'Request boundary',
    boundary: 'Redirect unauthenticated seller paths before route render.',
  },
  {
    conceptualPath: 'generateMetadata()',
    kind: 'metadata',
    owner: 'Server metadata boundary',
    boundary: 'Product title, description, and social preview data.',
  },
]
