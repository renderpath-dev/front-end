import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ProductFormPreview } from './product-form-preview'
import {
  initialProductFormValues,
  productCategories,
  productConditions,
} from './product-form-types'
import type {
  ProductCategory,
  ProductCondition,
  ProductFormErrors,
  ProductFormSubmission,
  ProductFormValues,
} from './product-form-types'
import { hasProductFormErrors, validateProductForm } from './product-form-validation'
import './seller-product-form-mini-project.css'

export function SellerProductForm() {
  const [formValues, setFormValues] = useState(initialProductFormValues)
  const [validationErrors, setValidationErrors] = useState<ProductFormErrors>({})
  const [submission, setSubmission] = useState<ProductFormSubmission>({ status: 'idle' })

  function updateField<FieldName extends keyof ProductFormValues>(
    fieldName: FieldName,
    fieldValue: ProductFormValues[FieldName],
  ): void {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }))

    setValidationErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[fieldName]
      return nextErrors
    })

    if (submission.status === 'success') {
      setSubmission({ status: 'idle' })
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('name', event.currentTarget.value)
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    updateField('description', event.currentTarget.value)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    updateField('category', event.currentTarget.value as ProductCategory)
  }

  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('condition', event.currentTarget.value as ProductCondition)
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('price', event.currentTarget.value)
  }

  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('isPublished', event.currentTarget.checked)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validateProductForm(formValues)
    setValidationErrors(nextErrors)

    if (hasProductFormErrors(nextErrors)) {
      setSubmission({ status: 'idle' })
      return
    }

    setSubmission({ status: 'pending' })
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setSubmission({ status: 'success', submittedName: formValues.name.trim() })
  }

  const isPending = submission.status === 'pending'

  return (
    <section className="seller-product-project" aria-labelledby="seller-product-form-title">
      <header className="project-header">
        <div>
          <p className="project-eyebrow">SellerHub learning connection</p>
          <h2 id="seller-product-form-title">Seller Product Form</h2>
          <p>
            Practice a local product draft flow before adding routing, validation libraries,
            or a backend.
          </p>
        </div>
        <span className="project-status">{formValues.isPublished ? 'Published' : 'Draft'}</span>
      </header>

      <div className="product-form-layout">
        <form className="product-form" noValidate onSubmit={handleSubmit}>
          <label>
            Product name
            <input
              aria-describedby={validationErrors.name ? 'product-name-error' : undefined}
              aria-invalid={Boolean(validationErrors.name)}
              disabled={isPending}
              name="name"
              onChange={handleNameChange}
              value={formValues.name}
            />
          </label>
          {validationErrors.name && (
            <p className="field-error" id="product-name-error">
              {validationErrors.name}
            </p>
          )}

          <label>
            Description
            <textarea
              aria-describedby={
                validationErrors.description ? 'product-description-error' : undefined
              }
              aria-invalid={Boolean(validationErrors.description)}
              disabled={isPending}
              name="description"
              onChange={handleDescriptionChange}
              rows={5}
              value={formValues.description}
            />
          </label>
          {validationErrors.description && (
            <p className="field-error" id="product-description-error">
              {validationErrors.description}
            </p>
          )}

          <div className="product-form-row">
            <label>
              Category
              <select
                disabled={isPending}
                name="category"
                onChange={handleCategoryChange}
                value={formValues.category}
              >
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Price
              <input
                aria-describedby={validationErrors.price ? 'product-price-error' : undefined}
                aria-invalid={Boolean(validationErrors.price)}
                disabled={isPending}
                inputMode="decimal"
                min="0.01"
                name="price"
                onChange={handlePriceChange}
                step="0.01"
                type="number"
                value={formValues.price}
              />
            </label>
          </div>
          {validationErrors.price && (
            <p className="field-error" id="product-price-error">
              {validationErrors.price}
            </p>
          )}

          <fieldset disabled={isPending}>
            <legend>Condition</legend>
            <div className="condition-options">
              {productConditions.map((condition) => (
                <label className="inline-choice" key={condition}>
                  <input
                    checked={formValues.condition === condition}
                    name="condition"
                    onChange={handleConditionChange}
                    type="radio"
                    value={condition}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="publish-option">
            <input
              checked={formValues.isPublished}
              disabled={isPending}
              name="isPublished"
              onChange={handlePublishedChange}
              type="checkbox"
            />
            Publish after saving
          </label>

          <button disabled={isPending} type="submit">
            {isPending ? 'Saving product...' : 'Save product'}
          </button>

          {submission.status === 'success' && (
            <p className="success-message" role="status">
              {submission.submittedName} passed local validation and was saved in this demo.
            </p>
          )}
        </form>

        <ProductFormPreview values={formValues} />
      </div>
    </section>
  )
}
