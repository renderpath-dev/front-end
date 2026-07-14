export type SellerHubApiGapProduct = {
  id: string
  name: string
  category: string
  stage: 'Ready' | 'Review' | 'Blocked'
  stock: number
  margin: number
}

export const sellerHubApiGapProducts: SellerHubApiGapProduct[] = [
  {
    id: 'product-stand',
    name: 'Adjustable Laptop Stand',
    category: 'Ergonomics',
    stage: 'Ready',
    stock: 18,
    margin: 34,
  },
  {
    id: 'product-light',
    name: 'Studio Light Kit',
    category: 'Creator',
    stage: 'Review',
    stock: 7,
    margin: 29,
  },
  {
    id: 'product-dock',
    name: 'USB-C Seller Dock',
    category: 'Operations',
    stage: 'Ready',
    stock: 12,
    margin: 31,
  },
  {
    id: 'product-scale',
    name: 'Parcel Weight Scale',
    category: 'Operations',
    stage: 'Blocked',
    stock: 4,
    margin: 21,
  },
  {
    id: 'product-microphone',
    name: 'Podcast Microphone',
    category: 'Creator',
    stage: 'Ready',
    stock: 15,
    margin: 38,
  },
]

export const sellerHubApiGapCategories = ['All', 'Ergonomics', 'Creator', 'Operations'] as const

export type SellerHubApiGapCategory = (typeof sellerHubApiGapCategories)[number]

export function filterSellerHubProducts(
  products: SellerHubApiGapProduct[],
  query: string,
  category: SellerHubApiGapCategory,
) {
  const normalizedQuery = query.trim().toLowerCase()

  return products.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      `${product.name} ${product.category} ${product.stage}`.toLowerCase().includes(normalizedQuery)
    const matchesCategory = category === 'All' || product.category === category

    return matchesQuery && matchesCategory
  })
}
