export type SegmentFileKind = 'layout' | 'page' | 'loading' | 'error' | 'not-found' | 'route'

export type RouteSegmentNode = {
  segment: string
  pathname: string
  files: SegmentFileKind[]
  children?: RouteSegmentNode[]
}

export type FlattenedSegment = {
  pathname: string
  segment: string
  fileList: string
  depth: number
}

export const sellerHubSegmentTree: RouteSegmentNode = {
  segment: 'app',
  pathname: '/',
  files: ['layout', 'page', 'not-found'],
  children: [
    {
      segment: 'catalog',
      pathname: '/catalog',
      files: ['page', 'loading', 'error'],
      children: [
        {
          segment: '[productId]',
          pathname: '/catalog/[productId]',
          files: ['page', 'not-found'],
        },
      ],
    },
    {
      segment: 'seller',
      pathname: '/seller',
      files: ['layout'],
      children: [
        {
          segment: 'orders',
          pathname: '/seller/orders',
          files: ['page', 'loading', 'error'],
        },
      ],
    },
    {
      segment: 'checkout',
      pathname: '/checkout',
      files: ['page'],
    },
    {
      segment: 'api/orders',
      pathname: '/api/orders',
      files: ['route'],
    },
  ],
}

export function flattenSegmentTree(
  node: RouteSegmentNode,
  depth = 0,
): FlattenedSegment[] {
  const currentSegment = {
    pathname: node.pathname,
    segment: node.segment,
    fileList: node.files.map((file) => `${file}.tsx`).join(', '),
    depth,
  }

  return [
    currentSegment,
    ...(node.children ?? []).flatMap((child) => flattenSegmentTree(child, depth + 1)),
  ]
}
