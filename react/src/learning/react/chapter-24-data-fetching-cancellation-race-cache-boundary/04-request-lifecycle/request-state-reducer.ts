export type RequestFailureReason =
  | 'abort'
  | 'domain'
  | 'http'
  | 'network'
  | 'parse'
  | 'timeout'

export type RequestError = {
  message: string
  reason: RequestFailureReason
}

export type RequestState<TData> =
  | {
      status: 'idle'
      data: null
      error: null
      lastSuccessfulData: TData | null
      requestId: null
    }
  | {
      status: 'pending'
      data: null
      error: null
      lastSuccessfulData: TData | null
      requestId: string
    }
  | {
      status: 'success'
      data: TData
      error: null
      lastSuccessfulData: TData
      requestId: string
    }
  | {
      status: 'empty'
      data: TData
      error: null
      lastSuccessfulData: TData | null
      requestId: string
    }
  | {
      status: 'error'
      data: null
      error: RequestError
      lastSuccessfulData: TData | null
      requestId: string
    }
  | {
      status: 'refetching'
      data: TData
      error: null
      lastSuccessfulData: TData
      requestId: string
    }

export type RequestStateAction<TData> =
  | { type: 'start'; requestId: string }
  | { type: 'resolve'; data: TData; requestId: string }
  | { type: 'resolve-empty'; data: TData; requestId: string }
  | { type: 'reject'; error: RequestError; requestId: string }
  | { type: 'abort'; requestId: string }
  | { type: 'reset' }

export function createInitialRequestState<TData>(): RequestState<TData> {
  return {
    status: 'idle',
    data: null,
    error: null,
    lastSuccessfulData: null,
    requestId: null,
  }
}

export function reduceRequestState<TData>(
  state: RequestState<TData>,
  action: RequestStateAction<TData>,
): RequestState<TData> {
  switch (action.type) {
    case 'start':
      if (state.status === 'success' || state.status === 'refetching') {
        return {
          status: 'refetching',
          data: state.lastSuccessfulData,
          error: null,
          lastSuccessfulData: state.lastSuccessfulData,
          requestId: action.requestId,
        }
      }

      return {
        status: 'pending',
        data: null,
        error: null,
        lastSuccessfulData: state.lastSuccessfulData,
        requestId: action.requestId,
      }

    case 'resolve':
      if (!isCurrentRequest(state, action.requestId)) {
        return state
      }

      return {
        status: 'success',
        data: action.data,
        error: null,
        lastSuccessfulData: action.data,
        requestId: action.requestId,
      }

    case 'resolve-empty':
      if (!isCurrentRequest(state, action.requestId)) {
        return state
      }

      return {
        status: 'empty',
        data: action.data,
        error: null,
        lastSuccessfulData: state.lastSuccessfulData,
        requestId: action.requestId,
      }

    case 'reject':
      if (!isCurrentRequest(state, action.requestId)) {
        return state
      }

      return {
        status: 'error',
        data: null,
        error: action.error,
        lastSuccessfulData: state.lastSuccessfulData,
        requestId: action.requestId,
      }

    case 'abort':
      if (!isCurrentRequest(state, action.requestId)) {
        return state
      }

      if (state.lastSuccessfulData !== null) {
        return {
          status: 'success',
          data: state.lastSuccessfulData,
          error: null,
          lastSuccessfulData: state.lastSuccessfulData,
          requestId: action.requestId,
        }
      }

      return createInitialRequestState<TData>()

    case 'reset':
      return createInitialRequestState<TData>()
  }
}

function isCurrentRequest<TData>(state: RequestState<TData>, requestId: string): boolean {
  return state.requestId === requestId
}
