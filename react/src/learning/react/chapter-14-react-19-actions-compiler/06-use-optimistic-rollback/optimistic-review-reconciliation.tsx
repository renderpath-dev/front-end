import { startTransition, useOptimistic, useRef, useState } from 'react'

type Review = {
  id: string
  text: string
  status: 'confirmed' | 'pending'
}

type PendingReview = {
  id: string
  text: string
}

const initialReviews: Review[] = [
  {
    id: 'review-1',
    text: 'Fast delivery and clear product details.',
    status: 'confirmed',
  },
]

export function OptimisticReviewReconciliation() {
  const [confirmedReviews, setConfirmedReviews] = useState(initialReviews)
  const [feedback, setFeedback] = useState('Submit a review. Include fail to test rollback.')
  const nextReviewId = useRef(2)
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    confirmedReviews,
    (currentReviews, pendingReview: PendingReview): Review[] => [
      ...currentReviews,
      { ...pendingReview, status: 'pending' },
    ],
  )

  async function submitReview(formData: FormData): Promise<void> {
    const text = readFormString(formData, 'review').trim()
    const pendingReview = {
      id: `review-${nextReviewId.current}`,
      text,
    }
    nextReviewId.current += 1
    addOptimisticReview(pendingReview)

    await wait(650)

    if (!text || text.toLowerCase().includes('fail')) {
      startTransition(() => {
        setFeedback('The mutation failed. The optimistic review was rolled back.')
      })
      return
    }

    startTransition(() => {
      setConfirmedReviews((currentReviews) => [
        ...currentReviews,
        { ...pendingReview, status: 'confirmed' },
      ])
      setFeedback('The server result confirmed the optimistic review.')
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="optimistic-title">
      <p className="chapter14-kicker">9.6 useOptimistic</p>
      <h2 id="optimistic-title">Optimistic review and reconciliation</h2>
      <form action={submitReview} className="chapter14-form">
        <label className="chapter14-field">
          Product review
          <input name="review" placeholder="Write a short review" />
        </label>
        <button className="chapter14-button" type="submit">
          Add review
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
      <p className="chapter14-note">{feedback}</p>
    </section>
  )
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
