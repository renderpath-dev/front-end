import {
  startTransition,
  useActionState,
  useOptimistic,
  useRef,
  useState,
} from 'react'
import { useFormStatus } from 'react-dom'
import {
  confirmReview,
  initialCartState,
  initialCheckoutState,
  initialReviews,
  submitCheckoutAction,
  updateCartAction,
} from './sellerhub-action-model'
import type {
  CartLine,
  CartMutation,
  ProductReview,
} from './sellerhub-action-types'

export function SellerHubActionWorkspace() {
  const [checkoutState, checkoutAction, isCheckoutPending] = useActionState(
    submitCheckoutAction,
    initialCheckoutState,
  )
  const [cartState, dispatchCartAction, isCartPending] = useActionState(
    updateCartAction,
    initialCartState,
  )
  const [optimisticCart, applyOptimisticCart] = useOptimistic(
    cartState.lines,
    applyCartMutation,
  )
  const [reviews, setReviews] = useState(initialReviews)
  const [reviewMessage, setReviewMessage] = useState(
    'Submit a review. Include fail to simulate rollback.',
  )
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    addPendingReview,
  )
  const nextMutationId = useRef(1)
  const nextReviewId = useRef(2)

  function queueCartMutation(delta: number): void {
    const mutation: CartMutation = {
      productId: 'product-lamp',
      delta,
      mutationId: `cart-${nextMutationId.current}`,
    }
    nextMutationId.current += 1

    startTransition(() => {
      applyOptimisticCart(mutation)
      dispatchCartAction(mutation)
    })
  }

  async function submitReview(formData: FormData): Promise<void> {
    const value = formData.get('review')
    const text = typeof value === 'string' ? value.trim() : ''
    const reviewId = `review-${nextReviewId.current}`
    nextReviewId.current += 1
    addOptimisticReview({ id: reviewId, text })

    const confirmedReview = await confirmReview(reviewId, text)

    startTransition(() => {
      if (confirmedReview) {
        setReviews((currentReviews) => [...currentReviews, confirmedReview])
        setReviewMessage('The Action result confirmed the optimistic review.')
      } else {
        setReviewMessage('The Action failed and the optimistic review rolled back.')
      }
    })
  }

  return (
    <div className="chapter14-section-split">
      <article className="chapter14-card">
        <h3>Checkout Action</h3>
        <form action={checkoutAction} className="chapter14-form">
          <label className="chapter14-field">
            Checkout email
            <input defaultValue="buyer@example.com" name="email" type="email" />
          </label>
          <label className="chapter14-field">
            Delivery
            <select defaultValue="standard" name="delivery">
              <option value="standard">Standard</option>
              <option value="express">Express</option>
            </select>
          </label>
          <CheckoutSubmitButton />
        </form>
        <p className={`chapter14-result chapter14-result-${checkoutState.status}`}>
          {checkoutState.message}
        </p>
        <span className="chapter14-pill">
          Action sequence: {checkoutState.sequence}
        </span>
        <span className="chapter14-pill">
          Hook pending: {String(isCheckoutPending)}
        </span>
      </article>

      <article className="chapter14-card">
        <h3>Queued optimistic cart</h3>
        {optimisticCart.map((line) => (
          <div className="chapter14-cart-line" key={line.productId}>
            <span>{line.productName}</span>
            <strong>{line.quantity}</strong>
          </div>
        ))}
        <div className="chapter14-action-row">
          <button
            className="chapter14-button"
            onClick={() => queueCartMutation(-1)}
            type="button"
          >
            Decrease
          </button>
          <button
            className="chapter14-button"
            onClick={() => queueCartMutation(1)}
            type="button"
          >
            Increase
          </button>
        </div>
        <p className="chapter14-note">
          {isCartPending ? 'Cart Action queue is pending.' : cartState.message}
        </p>
        <small>{cartState.completedMutationIds.join(', ') || 'No completed mutations'}</small>
      </article>

      <article className="chapter14-card chapter14-card-wide">
        <h3>Optimistic product reviews</h3>
        <form action={submitReview} className="chapter14-form">
          <label className="chapter14-field">
            Review
            <input name="review" placeholder="Write a review" />
          </label>
          <button className="chapter14-button" type="submit">
            Submit review
          </button>
        </form>
        <ul className="chapter14-list">
          {optimisticReviews.map((review) => (
            <li key={review.id}>
              <strong>{review.text || 'Empty review'}</strong>
              <span>{review.status}</span>
            </li>
          ))}
        </ul>
        <p className="chapter14-note">{reviewMessage}</p>
      </article>
    </div>
  )
}

function CheckoutSubmitButton() {
  const status = useFormStatus()
  const email = status.data?.get('email')

  return (
    <button className="chapter14-button" disabled={status.pending} type="submit">
      {status.pending && typeof email === 'string'
        ? `Submitting ${email}...`
        : 'Submit checkout'}
    </button>
  )
}

function applyCartMutation(
  currentLines: CartLine[],
  mutation: CartMutation,
): CartLine[] {
  return currentLines.map((line) =>
    line.productId === mutation.productId
      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }
      : line,
  )
}

function addPendingReview(
  currentReviews: ProductReview[],
  review: Pick<ProductReview, 'id' | 'text'>,
): ProductReview[] {
  return [...currentReviews, { ...review, status: 'pending' }]
}
