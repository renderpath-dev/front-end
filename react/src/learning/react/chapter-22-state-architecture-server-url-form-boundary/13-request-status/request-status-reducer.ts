export type RequestState<TData> =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; data: TData }
  | { status: 'empty' }
  | { status: 'error'; message: string; previousData?: TData }
  | { status: 'refetching'; data: TData }

export type RequestAction<TData> =
  | { type: 'start' }
  | { type: 'resolve'; data: TData }
  | { type: 'resolve-empty' }
  | { type: 'reject'; message: string }
  | { type: 'reset' }

export function requestStatusReducer<TData>(
  state: RequestState<TData>,
  action: RequestAction<TData>,
): RequestState<TData> {
  switch (action.type) {
    case 'start': {
      if (state.status === 'success') {
        return { status: 'refetching', data: state.data }
      }

      if (state.status === 'refetching') {
        return state
      }

      if (state.status === 'error' && state.previousData !== undefined) {
        return { status: 'refetching', data: state.previousData }
      }

      return { status: 'pending' }
    }

    case 'resolve': {
      return { status: 'success', data: action.data }
    }

    case 'resolve-empty': {
      return { status: 'empty' }
    }

    case 'reject': {
      if (state.status === 'success' || state.status === 'refetching') {
        return {
          status: 'error',
          message: action.message,
          previousData: state.data,
        }
      }

      return { status: 'error', message: action.message }
    }

    case 'reset': {
      return { status: 'idle' }
    }

    default: {
      return assertNever(action)
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`Unsupported request action: ${JSON.stringify(value)}`)
}
