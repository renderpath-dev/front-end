import type { ProductFormErrors, ProductFormValues } from './product-form-types'

export function validateProductForm(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {}
  const numericPrice = Number(values.price)

  if (values.name.trim().length < 3) {
    errors.name = 'Use at least 3 characters.'
  }

  if (values.description.trim().length < 20) {
    errors.description = 'Use at least 20 characters.'
  }

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    errors.price = 'Enter a price greater than zero.'
  }

  return errors
}

export function hasProductFormErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0
}
