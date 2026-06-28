import { useState } from 'react'
import type { FormEvent } from 'react'
import type { LoginValues } from './sellerhub-testing-types'

type SellerHubLoginFormProps = {
  isPending?: boolean
  onSubmit: (values: LoginValues) => void
}

export function SellerHubLoginForm({ isPending = false, onSubmit }: SellerHubLoginFormProps) {
  const [values, setValues] = useState<LoginValues>({
    email: '',
    password: '',
  })
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!values.email.includes('@') || values.password.length < 6) {
      setValidationMessage('Enter a valid email and password.')
      return
    }

    setValidationMessage(null)
    onSubmit(values)
  }

  return (
    <form className="workflow-card" onSubmit={handleSubmit}>
      <h3>Seller login</h3>
      <label className="field-label" htmlFor="workflow-login-email">
        Email
      </label>
      <input
        className="text-input"
        id="workflow-login-email"
        onChange={(event) => {
          const email = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            email,
          }))
        }}
        type="email"
        value={values.email}
      />

      <label className="field-label" htmlFor="workflow-login-password">
        Password
      </label>
      <input
        className="text-input"
        id="workflow-login-password"
        onChange={(event) => {
          const password = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            password,
          }))
        }}
        type="password"
        value={values.password}
      />

      {validationMessage ? <p role="alert">{validationMessage}</p> : null}

      <button disabled={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
