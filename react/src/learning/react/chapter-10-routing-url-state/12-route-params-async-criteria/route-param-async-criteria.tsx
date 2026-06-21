import { useEffect, useReducer } from 'react'
import { Link, Route, Routes, useParams } from 'react-router'

type ProductRequestState =
  | { status: 'idle' }
  | { status: 'pending'; productId: string }
  | { status: 'success'; productId: string; summary: string }
  | { status: 'error'; productId: string; message: string }

type ProductRequestAction =
  | { type: 'request'; productId: string }
  | { type: 'resolve'; productId: string; summary: string }
  | { type: 'reject'; productId: string; message: string }

function assertNever(action: never): never {
  throw new Error(`Unhandled product request action: ${JSON.stringify(action)}`)
}

function productRequestReducer(
  _state: ProductRequestState,
  action: ProductRequestAction,
): ProductRequestState {
  switch (action.type) {
    case 'request':
      return { status: 'pending', productId: action.productId }
    case 'resolve':
      return { status: 'success', productId: action.productId, summary: action.summary }
    case 'reject':
      return { status: 'error', productId: action.productId, message: action.message }
    default:
      return assertNever(action)
  }
}

function requestProductSummary(productId: string, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      resolve(`Loaded async criteria for ${productId}`)
    }, productId === 'lamp-101' ? 700 : 300)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timerId)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

function AsyncProductCriteriaResult() {
  const { productId } = useParams<'productId'>()
  const [requestState, dispatch] = useReducer(productRequestReducer, { status: 'idle' })

  useEffect(() => {
    if (!productId) {
      return
    }

    const controller = new AbortController()
    let ignore = false

    dispatch({ type: 'request', productId })

    void requestProductSummary(productId, controller.signal)
      .then((summary) => {
        if (!ignore) {
          dispatch({ type: 'resolve', productId, summary })
        }
      })
      .catch((error: unknown) => {
        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {
          dispatch({
            type: 'reject',
            productId,
            message: error instanceof Error ? error.message : 'Unknown request failure',
          })
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [productId])

  if (!productId) {
    return <p className="routing-error-text">Missing productId request criterion.</p>
  }

  if (requestState.status === 'pending') {
    return <p>Loading {requestState.productId}...</p>
  }

  if (requestState.status === 'success') {
    return <p className="routing-success-text">{requestState.summary}</p>
  }

  if (requestState.status === 'error') {
    return <p className="routing-error-text">{requestState.message}</p>
  }

  return <p>Select a product route.</p>
}

export function RouteParamAsyncCriteria() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">12 / Async route criteria</p>
      <h2>Route params can drive an abortable request lifecycle</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/async/lamp-101">Load lamp slowly</Link>
        <Link to="/practice/async/chair-204">Load chair quickly</Link>
      </div>
      <Routes>
        <Route element={<AsyncProductCriteriaResult />} path="/practice/async/:productId" />
      </Routes>
    </article>
  )
}
