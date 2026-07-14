import type { RequestState } from '../04-request-lifecycle/request-state-reducer'

type AsyncStatusRegionProps<TData> = {
  label: string
  state: RequestState<TData>
}

export function AsyncStatusRegion<TData>({ label, state }: AsyncStatusRegionProps<TData>) {
  if (state.status === 'error') {
    return (
      <p role="alert">
        {label}: {state.error.message}
      </p>
    )
  }

  return (
    <p role="status">
      {label}: {state.status}
    </p>
  )
}
