import {
  encodeCatalogFilters,
  parseCatalogFilters,
} from '../11-url-search-params/search-param-codec'
import type { CatalogFilters } from '../11-url-search-params/search-param-codec'

export type CatalogSearchState = {
  filters: CatalogFilters
  search: string
  cacheKey: string
}

export function createCatalogSearchState(search: string): CatalogSearchState {
  const params = new URLSearchParams(search)
  const filters = parseCatalogFilters(params)
  const encodedFilters = encodeCatalogFilters(filters)
  const serializedSearch = encodedFilters.toString()

  return {
    filters,
    search: serializedSearch,
    cacheKey: `catalog:${serializedSearch}`,
  }
}
