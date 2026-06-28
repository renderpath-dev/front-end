import type {
  ProductStatus,
  ProductViewModel,
} from '../../shared/api/sellerhub-adapters'

export type CatalogStatusFilter = 'all' | ProductStatus
export type CatalogSort = 'name' | 'price-asc' | 'price-desc'

export type CatalogCriteria = {
  query: string
  status: CatalogStatusFilter
  sort: CatalogSort
}

const statusValues: readonly CatalogStatusFilter[] = ['all', 'active', 'archived']
const sortValues: readonly CatalogSort[] = ['name', 'price-asc', 'price-desc']

export function readCatalogCriteria(searchParams: URLSearchParams): CatalogCriteria {
  const status = searchParams.get('status')
  const sort = searchParams.get('sort')

  return {
    query: searchParams.get('query')?.trim() ?? '',
    status: statusValues.includes(status as CatalogStatusFilter)
      ? (status as CatalogStatusFilter)
      : 'all',
    sort: sortValues.includes(sort as CatalogSort) ? (sort as CatalogSort) : 'name',
  }
}

export function deriveCatalogProducts(
  products: readonly ProductViewModel[],
  criteria: CatalogCriteria,
): ProductViewModel[] {
  const normalizedQuery = criteria.query.toLowerCase()

  return products
    .filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      const matchesStatus =
        criteria.status === 'all' || product.status === criteria.status

      return matchesQuery && matchesStatus
    })
    .slice()
    .sort((left, right) => {
      if (criteria.sort === 'price-asc') {
        return left.unitPriceInCents - right.unitPriceInCents
      }

      if (criteria.sort === 'price-desc') {
        return right.unitPriceInCents - left.unitPriceInCents
      }

      return left.name.localeCompare(right.name)
    })
}
