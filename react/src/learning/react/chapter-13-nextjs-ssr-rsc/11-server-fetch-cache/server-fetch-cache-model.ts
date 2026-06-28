export type FetchBoundaryStep = {
  step: string
  owner: string
  cacheKey: string
  output: string
}

export const serverFetchCacheSteps: FetchBoundaryStep[] = [
  {
    step: 'Route request',
    owner: 'Next.js App Router',
    cacheKey: '/catalog?category=lighting',
    output: 'Segment match and render plan',
  },
  {
    step: 'Server fetch',
    owner: 'Server Component',
    cacheKey: 'GET /products?category=lighting',
    output: 'Product rows and serialized props',
  },
  {
    step: 'Client interaction',
    owner: 'Client Component',
    cacheKey: 'local search draft',
    output: 'Filtered visible list after hydration',
  },
  {
    step: 'Revalidate',
    owner: 'Framework cache policy',
    cacheKey: 'catalog products tag',
    output: 'Fresh server output for later requests',
  },
]
