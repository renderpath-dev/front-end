export type ArchitectureBoundary = {
  scenario: string
  serverOwner: string
  clientOwner: string
  risk: string
  qualityGate: string
}

export const sellerHubArchitectureBoundaries: ArchitectureBoundary[] = [
  {
    scenario: 'Catalog search',
    serverOwner: 'Server Component fetches initial products.',
    clientOwner: 'Client filter controls own search draft after hydration.',
    risk: 'Reading localStorage during first render can create a mismatch.',
    qualityGate: 'Component tests verify visible filters. Build verifies module boundaries.',
  },
  {
    scenario: 'Product detail',
    serverOwner: 'Dynamic segment resolves productId and can raise not-found.',
    clientOwner: 'Client island handles wishlist or compare interaction later.',
    risk: 'Returning an empty page hides missing product problems.',
    qualityGate: 'Route logic tests cover missing IDs and fallback mapping.',
  },
  {
    scenario: 'Seller orders',
    serverOwner: 'Server fetch loads initial order rows with auth context.',
    clientOwner: 'Status filter and sorting run in a hydrated island.',
    risk: 'Proxy redirect is not final authorization for sensitive data.',
    qualityGate: 'Integration tests cover protected route behavior.',
  },
  {
    scenario: 'Checkout',
    serverOwner: 'Server page can prepare stable shell and metadata.',
    clientOwner: 'Form state, validation errors, pending state, and submit events.',
    risk: 'Server Component event handlers are invalid.',
    qualityGate: 'Form behavior tests cover submit branches.',
  },
  {
    scenario: 'Order API',
    serverOwner: 'Route Handler owns Request and Response.',
    clientOwner: 'Client component consumes normalized JSON only.',
    risk: 'Route Handler is not a React component and cannot render JSX.',
    qualityGate: 'Network-boundary tests mock Request and Response behavior.',
  },
]
