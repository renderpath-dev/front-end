type AccessibleLoginFormProps = {
  errorMessage?: string
}

export function AccessibleLoginForm({ errorMessage }: AccessibleLoginFormProps) {
  return (
    <form className="practice-panel" aria-labelledby="accessible-login-title">
      <p className="skill-pill">Accessible query</p>
      <h2 id="accessible-login-title">Seller login</h2>

      <label className="field-label" htmlFor="seller-email">
        Email
      </label>
      <input className="text-input" id="seller-email" name="email" type="email" />

      <label className="field-label" htmlFor="seller-password">
        Password
      </label>
      <input className="text-input" id="seller-password" name="password" type="password" />

      {errorMessage ? <p role="alert">{errorMessage}</p> : null}

      <button type="submit">Sign in</button>
    </form>
  )
}
