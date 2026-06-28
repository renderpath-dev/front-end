import { setupServer } from 'msw/node'
import { sellerHubTestHandlers } from './sellerhub-test-handlers'

export const server = setupServer(...sellerHubTestHandlers)
