export type CatalogProduct = {
  id: string
  name: string
  active: boolean
}

const catalogProducts: CatalogProduct[] = [
  { id: 'product-101', name: 'Desk Lamp', active: true },
  { id: 'product-102', name: 'Archive Shelf', active: false },
]

export const catalogFeaturePublicApi = {
  listVisibleProducts(): CatalogProduct[] {
    return catalogProducts.filter((product) => product.active)
  },
  getProductRoute(productId: string): string {
    return `/catalog/${encodeURIComponent(productId)}`
  },
}
