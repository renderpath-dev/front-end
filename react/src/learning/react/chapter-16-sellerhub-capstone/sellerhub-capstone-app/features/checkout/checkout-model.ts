export type CheckoutValues = {
  email: string
  shippingAddress: string
  acceptTerms: boolean
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>

export const emptyCheckoutValues: CheckoutValues = {
  email: '',
  shippingAddress: '',
  acceptTerms: false,
}

export function validateCheckoutValues(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!values.email.includes('@')) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.shippingAddress.trim().length < 10) {
    errors.shippingAddress = 'Enter a complete shipping address.'
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'Accept the local demo terms.'
  }

  return errors
}
