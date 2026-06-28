import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { Field } from '../../design-system/field'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { assertCheckoutResultDto } from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { deriveCartSummary } from '../cart/cart-model'
import {
  emptyCheckoutValues,
  validateCheckoutValues,
} from './checkout-model'
import type { CheckoutErrors, CheckoutValues } from './checkout-model'

type SubmitState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'error'; message: string }
  | { status: 'success'; orderId: string }

export function CheckoutForm() {
  const [values, setValues] = useState<CheckoutValues>(emptyCheckoutValues)
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' })
  const { cart, cartDispatch, locale, reportError } = useSellerHubApp()
  const summary = deriveCartSummary(cart)

  function updateField<Key extends keyof CheckoutValues>(
    field: Key,
    value: CheckoutValues[Key],
  ) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateCheckoutValues(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState({ status: 'error', message: 'Resolve the highlighted fields.' })
      return
    }

    setSubmitState({ status: 'pending' })

    try {
      const response = await mockSellerHubGateway.submitCheckout({
        email: values.email,
        shippingAddress: values.shippingAddress,
        totalInCents: summary.subtotalInCents,
      })
      assertCheckoutResultDto(response)
      cartDispatch({ type: 'cart-cleared' })
      setSubmitState({ status: 'success', orderId: response.orderId })
    } catch (error) {
      const normalizedError = normalizeSellerHubError(error)
      reportError('checkout', normalizedError)
      setSubmitState({ status: 'error', message: normalizedError.message })
    }
  }

  if (submitState.status === 'success') {
    return (
      <section className="sellerhub-route-state" role="status">
        <p className="sellerhub-eyebrow">Confirmed result</p>
        <h2>Order accepted</h2>
        <p>Order {submitState.orderId} is ready for the local seller workflow.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="sellerhub-checkout-title">
      <p className="sellerhub-eyebrow">Controlled form</p>
      <h2 id="sellerhub-checkout-title">
        {sellerHubMessages[locale].checkoutTitle}
      </h2>
      <p>Local demo subtotal: {formatCurrency(summary.subtotalInCents, locale)}</p>

      <form className="sellerhub-form" noValidate onSubmit={handleSubmit}>
        <Field error={errors.email} htmlFor="checkout-email" label="Email">
          <input
            aria-describedby={errors.email ? 'checkout-email-message' : undefined}
            id="checkout-email"
            onChange={(event) => updateField('email', event.target.value)}
            type="email"
            value={values.email}
          />
        </Field>

        <Field
          error={errors.shippingAddress}
          htmlFor="checkout-address"
          label="Shipping address"
        >
          <textarea
            aria-describedby={
              errors.shippingAddress ? 'checkout-address-message' : undefined
            }
            id="checkout-address"
            onChange={(event) =>
              updateField('shippingAddress', event.target.value)
            }
            rows={4}
            value={values.shippingAddress}
          />
        </Field>

        <div className="sellerhub-checkbox-field">
          <label htmlFor="checkout-terms">
            <input
              checked={values.acceptTerms}
              id="checkout-terms"
              onChange={(event) => updateField('acceptTerms', event.target.checked)}
              type="checkbox"
            />
            Accept local demo terms
          </label>
          {errors.acceptTerms && (
            <p className="sellerhub-field-error">{errors.acceptTerms}</p>
          )}
        </div>

        {submitState.status === 'error' && (
          <p className="sellerhub-submit-error" role="alert">
            {submitState.message}
          </p>
        )}

        <PrimitiveButton
          disabled={submitState.status === 'pending' || summary.itemCount === 0}
          type="submit"
        >
          {submitState.status === 'pending' ? 'Submitting...' : 'Place local order'}
        </PrimitiveButton>
      </form>
    </section>
  )
}
