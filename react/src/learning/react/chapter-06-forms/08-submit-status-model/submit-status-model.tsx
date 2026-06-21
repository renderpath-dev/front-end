import { useState } from 'react'
import type { FormEvent } from 'react'

type SubmissionState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; submittedEmail: string }

export function SubmitStatusModel() {
  const [email, setEmail] = useState('seller@example.com')
  const [validationError, setValidationError] = useState('')
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!email.includes('@')) {
      setValidationError('Enter a valid email address.')
      return
    }

    setValidationError('')
    setSubmission({ status: 'pending' })
    await new Promise((resolve) => window.setTimeout(resolve, 400))
    setSubmission({ status: 'success', submittedEmail: email })
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Submission state</p>
      <h3>Validation and request status stay separate</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Seller email
          <input
            disabled={submission.status === 'pending'}
            onChange={(event) => setEmail(event.currentTarget.value)}
            value={email}
          />
        </label>
        {validationError && <p className="field-error">{validationError}</p>}
        <button disabled={submission.status === 'pending'} type="submit">
          {submission.status === 'pending' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submission.status === 'success' && (
        <p className="success-message" role="status">
          Saved locally for {submission.submittedEmail}.
        </p>
      )}
    </section>
  )
}
