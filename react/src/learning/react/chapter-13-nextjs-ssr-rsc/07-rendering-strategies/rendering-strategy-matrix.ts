export type RenderingStrategy = {
  name: 'SSR' | 'SSG' | 'ISR' | 'Dynamic Rendering' | 'CSR'
  firstOutputOwner: string
  interactionOwner: string
  sellerHubFit: string
}

export const renderingStrategies: RenderingStrategy[] = [
  {
    name: 'SSR',
    firstOutputOwner: 'Server request render',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Personalized seller orders and checkout shell.',
  },
  {
    name: 'SSG',
    firstOutputOwner: 'Build-time prerender',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Marketing pages and mostly stable category pages.',
  },
  {
    name: 'ISR',
    firstOutputOwner: 'Cached static output with timed regeneration',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Catalog pages that can tolerate stale data windows.',
  },
  {
    name: 'Dynamic Rendering',
    firstOutputOwner: 'Server request render with dynamic inputs',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Dashboard summary with cookies, auth, or request-specific data.',
  },
  {
    name: 'CSR',
    firstOutputOwner: 'Browser JavaScript after boot',
    interactionOwner: 'Client React tree',
    sellerHubFit: 'Highly interactive internal widgets after an initial shell.',
  },
]
