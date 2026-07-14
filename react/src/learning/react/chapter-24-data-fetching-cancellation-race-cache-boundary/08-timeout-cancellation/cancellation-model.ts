export type CancellationReason = 'filter-change' | 'route-change' | 'timeout' | 'user-cancel'

export type CancellationBoundary = {
  clientSignal: boolean
  reason: CancellationReason
  serverGuarantee: false
  userVisible: boolean
}

export function describeCancellationBoundary(reason: CancellationReason): CancellationBoundary {
  return {
    clientSignal: true,
    reason,
    serverGuarantee: false,
    userVisible: reason === 'timeout' || reason === 'user-cancel',
  }
}

export function combineCancellationReasons(
  reasons: readonly CancellationReason[],
): CancellationBoundary[] {
  return reasons.map((reason) => describeCancellationBoundary(reason))
}
