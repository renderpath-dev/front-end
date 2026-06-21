import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

type CheckoutStep = 'shipping' | 'review'

function parseCheckoutStep(value: string | null): CheckoutStep {
  return value === 'review' ? 'review' : 'shipping'
}

export function SellerHubCheckoutPage() {
  const [searchParams] = useSearchParams()
  const [shippingNote, setShippingNote] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const step = parseCheckoutStep(searchParams.get('step'))

  function continueToReview(): void {
    navigate('/checkout?step=review', { state: location.state })
  }

  function placeLocalOrder(): void {
    navigate('/catalog', { replace: true, state: { checkoutComplete: true } })
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>URL step and local draft boundary</p>
          <h3>Checkout</h3>
        </div>
        <code>/checkout?step={step}</code>
      </div>
      <label className="routing-field">
        <span>Private shipping note</span>
        <textarea
          onChange={(event) => setShippingNote(event.currentTarget.value)}
          placeholder="This local draft is not stored in the URL"
          value={shippingNote}
        />
      </label>
      <p>Current step: {step}</p>
      <div className="routing-practice-actions">
        {step === 'shipping' ? (
          <button onClick={continueToReview} type="button">
            Continue to review
          </button>
        ) : (
          <button onClick={placeLocalOrder} type="button">
            Place local order
          </button>
        )}
      </div>
    </section>
  )
}
