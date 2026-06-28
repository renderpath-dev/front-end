export type SellerHubError = {
  kind: 'not-found' | 'conflict' | 'service' | 'unknown'
  code: string
  message: string
}

function isErrorRecord(value: unknown): value is {
  status?: unknown
  code?: unknown
  message?: unknown
} {
  return typeof value === 'object' && value !== null
}

export function normalizeSellerHubError(error: unknown): SellerHubError {
  if (isErrorRecord(error)) {
    const status = typeof error.status === 'number' ? error.status : undefined
    const code = typeof error.code === 'string' ? error.code : 'UNKNOWN'
    const message =
      typeof error.message === 'string' ? error.message : 'Unexpected SellerHub error'

    if (status === 404) {
      return { kind: 'not-found', code, message }
    }

    if (status === 409) {
      return { kind: 'conflict', code, message }
    }

    if (status !== undefined && status >= 500) {
      return { kind: 'service', code, message }
    }
  }

  if (error instanceof Error) {
    return { kind: 'unknown', code: 'UNKNOWN', message: error.message }
  }

  return { kind: 'unknown', code: 'UNKNOWN', message: 'Unexpected SellerHub error' }
}
