export type RequestSequenceGuard = {
  completeIfLatest: <TValue>(requestId: number, value: TValue) => TValue | null
  getLatestRequestId: () => number
  isLatest: (requestId: number) => boolean
  startRequest: () => number
}

export function createRequestSequenceGuard(): RequestSequenceGuard {
  let latestRequestId = 0

  return {
    completeIfLatest<TValue>(requestId: number, value: TValue): TValue | null {
      return requestId === latestRequestId ? value : null
    },
    getLatestRequestId(): number {
      return latestRequestId
    },
    isLatest(requestId: number): boolean {
      return requestId === latestRequestId
    },
    startRequest(): number {
      latestRequestId += 1
      return latestRequestId
    },
  }
}
