import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import {
  createInitialRequestState,
  reduceRequestState,
} from '../04-request-lifecycle/request-state-reducer'
import type { RequestError, RequestState } from '../04-request-lifecycle/request-state-reducer'
import { classifyAbortableRequestError } from '../07-abort-controller/abortable-fetch-model'

export type SellerHubResourceFetcher<TCriteria, TData> = (
  criteria: TCriteria,
  signal: AbortSignal,
) => Promise<TData>

export type UseSellerHubResourceOptions<TCriteria, TData> = {
  criteria: TCriteria
  fetcher: SellerHubResourceFetcher<TCriteria, TData>
  isEmpty: (data: TData) => boolean
  resourceKey: string
}

export type UseSellerHubResourceResult<TData> = {
  abort: () => void
  refetch: () => void
  resourceKey: string
  state: RequestState<TData>
}

export function useSellerHubResource<TCriteria, TData>({
  criteria,
  fetcher,
  isEmpty,
  resourceKey,
}: UseSellerHubResourceOptions<TCriteria, TData>): UseSellerHubResourceResult<TData> {
  const [state, dispatch] = useReducer(
    reduceRequestState<TData>,
    undefined,
    createInitialRequestState<TData>,
  )
  const activeControllerRef = useRef<AbortController | null>(null)
  const requestCounterRef = useRef(0)

  const startRequest = useCallback(() => {
    requestCounterRef.current += 1
    const requestId = `${resourceKey}:${requestCounterRef.current}`
    const controller = new AbortController()
    activeControllerRef.current?.abort()
    activeControllerRef.current = controller

    dispatch({ type: 'start', requestId })

    void fetcher(criteria, controller.signal)
      .then((data) => {
        dispatch({
          type: isEmpty(data) ? 'resolve-empty' : 'resolve',
          data,
          requestId,
        })
      })
      .catch((error: unknown) => {
        if (classifyAbortableRequestError(error) === 'aborted') {
          dispatch({ type: 'abort', requestId })
          return
        }

        dispatch({
          type: 'reject',
          error: toRequestError(error),
          requestId,
        })
      })
  }, [criteria, fetcher, isEmpty, resourceKey])

  useEffect(() => {
    startRequest()

    return () => {
      activeControllerRef.current?.abort()
    }
  }, [startRequest])

  const abort = useCallback(() => {
    activeControllerRef.current?.abort()
  }, [])

  return useMemo(
    () => ({
      abort,
      refetch: startRequest,
      resourceKey,
      state,
    }),
    [abort, resourceKey, startRequest, state],
  )
}

function toRequestError(error: unknown): RequestError {
  return {
    message: error instanceof Error ? error.message : 'Request failed',
    reason: 'network',
  }
}
