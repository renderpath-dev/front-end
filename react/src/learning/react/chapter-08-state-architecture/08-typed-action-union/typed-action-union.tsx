import { useReducer } from 'react'

type ReviewState = {
  selectedOrderId: string | null
  status: 'idle' | 'reviewing'
}

type ReviewAction =
  | { type: 'review_started'; orderId: string }
  | { type: 'review_closed' }

function assertNever(value: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`)
}

function reviewReducer(_state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case 'review_started':
      return { selectedOrderId: action.orderId, status: 'reviewing' }
    case 'review_closed':
      return { selectedOrderId: null, status: 'idle' }
    default:
      return assertNever(action)
  }
}

export function TypedActionUnion() {
  const [review, dispatch] = useReducer(reviewReducer, {
    selectedOrderId: null,
    status: 'idle',
  })

  return (
    <article className="practice-card">
      <p className="practice-label">Action union</p>
      <h3>Narrow payloads by action type</h3>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'review_started', orderId: 'ORD-411' })}>
          Review order
        </button>
        <button onClick={() => dispatch({ type: 'review_closed' })}>Close review</button>
      </div>
      <p>
        {review.status}: {review.selectedOrderId ?? 'no order'}
      </p>
    </article>
  )
}
