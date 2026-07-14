import {
  createInitialRequestState,
  reduceRequestState,
} from '../04-request-lifecycle/request-state-reducer'
import type { OrderSummary } from './sellerhub-data-fetching-data'

export const initialOrdersResourceState =
  createInitialRequestState<readonly OrderSummary[]>()

export const reduceOrdersResourceState = reduceRequestState<readonly OrderSummary[]>
