import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'

export function FormErrorValidationPanel() {
  const skuId = useId()
  const errorId = `${skuId}-error`
  const [sku, setSku] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (error) {
      inputRef.current?.focus()
    }
  }, [error])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(sku.trim() ? '' : 'SKU is required before saving.')
  }

  return (
    <section className="a11y-card" aria-labelledby="form-errors-title">
      <p className="a11y-card-kicker">9.4</p>
      <h3 id="form-errors-title">Form errors and validation messages</h3>
      <p>
        Validation state should update aria-invalid, connect error text, and repair focus
        to the first invalid field or error summary.
      </p>
      <form className="a11y-form" onSubmit={handleSubmit} noValidate>
        {error ? <p role="alert">Review the SKU field error.</p> : null}
        <label htmlFor={skuId}>SKU</label>
        <input
          aria-errormessage={error ? errorId : undefined}
          aria-invalid={error ? 'true' : undefined}
          id={skuId}
          onChange={(event) => setSku(event.currentTarget.value)}
          ref={inputRef}
          value={sku}
        />
        {error ? <p id={errorId}>{error}</p> : null}
        <button type="submit">Validate SKU</button>
      </form>
    </section>
  )
}
