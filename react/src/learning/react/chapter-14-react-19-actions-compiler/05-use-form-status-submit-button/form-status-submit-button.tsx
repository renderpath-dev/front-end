import { startTransition, useState } from 'react'
import { useFormStatus } from 'react-dom'

type LoginResult = {
  email: string
  message: string
}

export function FormStatusSubmitButton() {
  const [result, setResult] = useState<LoginResult | null>(null)

  async function submitLogin(formData: FormData): Promise<void> {
    const email = readFormString(formData, 'email')
    await wait(600)

    startTransition(() => {
      setResult({
        email,
        message: email ? 'Login request accepted.' : 'Email is required.',
      })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="form-status-title">
      <p className="chapter14-kicker">9.5 useFormStatus</p>
      <h2 id="form-status-title">Nearest form status and submit button</h2>
      <form action={submitLogin} className="chapter14-form">
        <label className="chapter14-field">
          Seller email
          <input defaultValue="seller@example.com" name="email" type="email" />
        </label>
        <SubmitButton />
      </form>
      <p className="chapter14-result">
        {result ? `${result.email}: ${result.message}` : 'No login request submitted.'}
      </p>
    </section>
  )
}

function SubmitButton() {
  const status = useFormStatus()
  const pendingEmail = status.data?.get('email')

  return (
    <div className="chapter14-submit-status">
      <button className="chapter14-button" disabled={status.pending} type="submit">
        {status.pending ? 'Submitting login...' : 'Submit login'}
      </button>
      <span>
        {status.pending && typeof pendingEmail === 'string'
          ? `Submitting ${pendingEmail}`
          : 'The button reads its parent form status.'}
      </span>
    </div>
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
