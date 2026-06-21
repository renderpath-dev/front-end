import { useState } from 'react'
import type { FormEvent } from 'react'

export function FormSubmitDefaultBehavior() {
  const [submissionMessage, setSubmissionMessage] = useState('No submission yet.')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setSubmissionMessage('React handled the submit event without a page navigation.')
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Browser boundary</p>
      <h3>Form submit default behavior</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Search term
          <input defaultValue="wireless keyboard" name="searchTerm" />
        </label>
        <button type="submit">Submit search</button>
      </form>
      <p aria-live="polite">{submissionMessage}</p>
    </section>
  )
}
