import { useState } from 'react'
import type { FormEvent } from 'react'

type LoginFormErrors = {
  email?: string
  password?: string
}

export function FormValidationFeedback() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const nextErrors: LoginFormErrors = {}

    if (!email.includes('@')) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.'
    }

    setErrors(nextErrors)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Validation model</p>
      <h3>Validation derives field errors</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input onChange={(event) => setEmail(event.currentTarget.value)} value={email} />
        </label>
        {errors.email && <p className="field-error">{errors.email}</p>}
        <label>
          Password
          <input
            onChange={(event) => setPassword(event.currentTarget.value)}
            type="password"
            value={password}
          />
        </label>
        {errors.password && <p className="field-error">{errors.password}</p>}
        <button type="submit">Validate login</button>
      </form>
    </section>
  )
}
