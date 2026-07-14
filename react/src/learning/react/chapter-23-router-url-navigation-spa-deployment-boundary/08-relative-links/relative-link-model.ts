export type RelativeLinkCase = {
  currentPath: string
  target: string
  expectedPath: string
  reason: string
}

export const sellerHubRelativeLinkCases: RelativeLinkCase[] = [
  {
    currentPath: '/sellerhub',
    target: 'catalog',
    expectedPath: '/sellerhub/catalog',
    reason: 'An index route links to a child route without repeating the shell prefix.',
  },
  {
    currentPath: '/sellerhub/catalog/product-201',
    target: '../orders',
    expectedPath: '/sellerhub/catalog/orders',
    reason: 'Path-relative resolution removes only the last URL segment.',
  },
  {
    currentPath: '/sellerhub/catalog/product-201',
    target: '/sellerhub/orders',
    expectedPath: '/sellerhub/orders',
    reason: 'An absolute link starts from the app root and ignores the current route.',
  },
]

export function resolvePathRelativeLink(currentPath: string, target: string): string {
  if (target.startsWith('/')) {
    return normalizeResolvedPath(target)
  }

  const currentSegments = currentPath.split('/').filter(Boolean)
  const targetSegments = target.split('/').filter(Boolean)
  const resolvedSegments = [...currentSegments]

  for (const segment of targetSegments) {
    if (segment === '.') {
      continue
    }

    if (segment === '..') {
      resolvedSegments.pop()
      continue
    }

    resolvedSegments.push(segment)
  }

  return normalizeResolvedPath(`/${resolvedSegments.join('/')}`)
}

export function normalizeResolvedPath(pathname: string): string {
  const normalized = pathname.replace(/\/+/g, '/')

  if (normalized.length > 1 && normalized.endsWith('/')) {
    return normalized.slice(0, -1)
  }

  return normalized
}
