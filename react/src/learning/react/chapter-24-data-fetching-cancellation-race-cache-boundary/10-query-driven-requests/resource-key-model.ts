export type CatalogResourceCriteria = {
  channel: 'all' | 'marketplace' | 'retail'
  cursor?: string
  query: string
  sellerId: string
  sort: 'newest' | 'revenue'
}

export function buildCatalogResourceKey(criteria: CatalogResourceCriteria): string {
  const params = new URLSearchParams()
  params.set('sellerId', criteria.sellerId)
  params.set('query', criteria.query.trim().toLowerCase())
  params.set('channel', criteria.channel)
  params.set('sort', criteria.sort)

  if (criteria.cursor !== undefined && criteria.cursor.length > 0) {
    params.set('cursor', criteria.cursor)
  }

  return `catalog?${params.toString()}`
}

export function buildProductDetailResourceKey(sellerId: string, productId: string): string {
  return `product?sellerId=${encodeURIComponent(sellerId)}&productId=${encodeURIComponent(productId)}`
}
