import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'

export function SettingsErrorSummary() {
  const storeNameId = useId()
  const storeNameErrorId = `${storeNameId}-error`
  const [storeName, setStoreName] = useState('')
  const [storeNameError, setStoreNameError] = useState('')
  const storeNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (storeNameError) {
      storeNameRef.current?.focus()
    }
  }, [storeNameError])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextError = storeName.trim() ? '' : 'Store name is required.'
    setStoreNameError(nextError)
  }

  return (
    <section className="a11y-card" aria-labelledby="settings-error-title">
      <h3 id="settings-error-title">Settings error summary</h3>
      <p>
        Validation state controls aria-invalid, the error relationship, a summary alert,
        and focus repair after submit.
      </p>
      <form className="a11y-form" onSubmit={handleSubmit} noValidate>
        {storeNameError ? (
          <div className="a11y-error-summary" role="alert">
            <h4>Review settings errors</h4>
            <a href={`#${storeNameId}`}>Store name is required.</a>
          </div>
        ) : null}
        <label htmlFor={storeNameId}>Store name</label>
        <input
          aria-errormessage={storeNameError ? storeNameErrorId : undefined}
          aria-invalid={storeNameError ? 'true' : undefined}
          id={storeNameId}
          name="storeName"
          onChange={(event) => setStoreName(event.currentTarget.value)}
          ref={storeNameRef}
          value={storeName}
        />
        {storeNameError ? (
          <p className="a11y-field-error" id={storeNameErrorId}>
            {storeNameError}
          </p>
        ) : null}
        <button type="submit">Save settings</button>
      </form>
    </section>
  )
}
