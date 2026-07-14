export const catalogSortOptions = ['relevance', 'price-asc', 'price-desc'] as const
export const catalogChannelOptions = ['marketplace', 'direct', 'retail'] as const

export type CatalogSort = (typeof catalogSortOptions)[number]
export type CatalogChannel = (typeof catalogChannelOptions)[number]

export type CatalogFilters = {
  query: string
  minMargin: number
  inStockOnly: boolean
  channels: CatalogChannel[]
  sort: CatalogSort
}

export const defaultCatalogFilters: CatalogFilters = {
  query: '',
  minMargin: 0,
  inStockOnly: false,
  channels: [],
  sort: 'relevance',
}

const catalogSortSet = new Set<string>(catalogSortOptions)
const catalogChannelSet = new Set<string>(catalogChannelOptions)

export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  return {
    query: parseQuery(params.get('q')),
    minMargin: parseNonNegativeNumber(params.get('minMargin')),
    inStockOnly: parseBoolean(params.get('inStock')),
    channels: parseChannels(params.getAll('channel')),
    sort: parseSort(params.get('sort')),
  }
}

export function encodeCatalogFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams()
  const query = filters.query.trim()

  if (query.length > 0) {
    params.set('q', query)
  }

  if (filters.minMargin > defaultCatalogFilters.minMargin) {
    params.set('minMargin', String(filters.minMargin))
  }

  if (filters.inStockOnly) {
    params.set('inStock', 'true')
  }

  filters.channels.forEach((channel) => {
    if (catalogChannelSet.has(channel)) {
      params.append('channel', channel)
    }
  })

  if (filters.sort !== defaultCatalogFilters.sort) {
    params.set('sort', filters.sort)
  }

  return params
}

export function mergeCatalogFilterPatch(
  currentFilters: CatalogFilters,
  patch: Partial<CatalogFilters>,
): CatalogFilters {
  return {
    ...currentFilters,
    ...patch,
    channels: patch.channels ?? currentFilters.channels,
    query: patch.query ?? currentFilters.query,
  }
}

function parseQuery(value: string | null): string {
  return value?.trim() ?? defaultCatalogFilters.query
}

function parseNonNegativeNumber(value: string | null): number {
  if (value === null || value.trim() === '') {
    return defaultCatalogFilters.minMargin
  }

  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return defaultCatalogFilters.minMargin
  }

  return Math.round(parsedValue)
}

function parseBoolean(value: string | null): boolean {
  return value === 'true'
}

function parseChannels(values: string[]): CatalogChannel[] {
  const uniqueChannels = new Set<CatalogChannel>()

  values.forEach((value) => {
    if (catalogChannelSet.has(value)) {
      uniqueChannels.add(value as CatalogChannel)
    }
  })

  return Array.from(uniqueChannels)
}

function parseSort(value: string | null): CatalogSort {
  if (value !== null && catalogSortSet.has(value)) {
    return value as CatalogSort
  }

  return defaultCatalogFilters.sort
}
