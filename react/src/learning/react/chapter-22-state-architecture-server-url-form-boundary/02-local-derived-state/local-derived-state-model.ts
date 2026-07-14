import type { SellerHubProduct } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'

export type LocalDerivedStateModel = {
  query: string
  visibleProducts: SellerHubProduct[]
  visibleCount: number
  totalCount: number
  hasRedundantCountState: false
}

export function deriveLocalProductState(
  products: SellerHubProduct[],
  query: string,
): LocalDerivedStateModel {
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts =
    normalizedQuery.length === 0
      ? products
      : products.filter((product) => product.name.toLowerCase().includes(normalizedQuery))

  return {
    query,
    visibleProducts,
    visibleCount: visibleProducts.length,
    totalCount: products.length,
    hasRedundantCountState: false,
  }
}
