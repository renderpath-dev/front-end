type NormalizedClientError = {
  code: string
  message: string
  retryable: boolean
  status?: number
}

type GeneratedClientError = {
  status: number
  body?: {
    code?: string
    message?: string
  }
}

const sampleErrors: unknown[] = [
  {
    status: 409,
    body: {
      code: 'PRODUCT_CONFLICT',
      message: 'Product was updated by another session.',
    },
  },
  new TypeError('Failed to fetch'),
  'unexpected failure',
]

function isGeneratedClientError(error: unknown): error is GeneratedClientError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  )
}

function normalizeClientError(error: unknown): NormalizedClientError {
  if (isGeneratedClientError(error)) {
    return {
      code: error.body?.code ?? 'HTTP_ERROR',
      message: error.body?.message ?? `Request failed with status ${error.status}.`,
      retryable: error.status >= 500,
      status: error.status,
    }
  }

  if (error instanceof TypeError) {
    return {
      code: 'NETWORK_ERROR',
      message: 'The network request could not be completed.',
      retryable: true,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected client error occurred.',
    retryable: false,
  }
}

export function ErrorNormalizationPanel() {
  const normalizedErrors = sampleErrors.map(normalizeClientError)

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.7 Error normalization</p>
      <h2>Generated client errors become one UI-facing contract</h2>
      <div className="chapter15-grid">
        {normalizedErrors.map((error) => (
          <article className="chapter15-card" key={`${error.code}-${error.status ?? 'none'}`}>
            <h3>{error.code}</h3>
            <p>{error.message}</p>
            <span>{error.retryable ? 'Retry available' : 'Manual resolution required'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
