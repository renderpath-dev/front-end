export type ParsedUrlLocation = {
  pathname: string
  search: string
  hash: string
  routeSegments: string[]
  searchEntries: [string, string][]
}

const fallbackOrigin = 'https://sellerhub.example'

export function parseUrlLocation(input: string): ParsedUrlLocation {
  const parsedUrl = new URL(input, fallbackOrigin)

  return {
    pathname: parsedUrl.pathname,
    search: parsedUrl.search,
    hash: parsedUrl.hash,
    routeSegments: parsedUrl.pathname.split('/').filter(Boolean),
    searchEntries: Array.from(parsedUrl.searchParams.entries()),
  }
}

export function describeUrlOwnership(input: string): string {
  const location = parseUrlLocation(input)
  const entitySegment = location.routeSegments.at(-1) ?? 'none'
  const searchKeys = location.searchEntries.map(([key]) => key).join(', ') || 'none'
  const hashTarget = location.hash ? location.hash.slice(1) : 'none'

  return `page=${location.pathname}; entity=${entitySegment}; search=${searchKeys}; hash=${hashTarget}`
}
