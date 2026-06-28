import { startTransition, useState } from 'react'

type SubmittedCheckout = {
  email: string
  delivery: string
}

export function FormActionProgressiveBoundary() {
  const [submittedCheckout, setSubmittedCheckout] = useState<SubmittedCheckout | null>(
    null,
  )

  async function submitCheckout(formData: FormData): Promise<void> {
    const email = readFormString(formData, 'email')
    const delivery = readFormString(formData, 'delivery')

    await wait(450)

    startTransition(() => {
      setSubmittedCheckout({ email, delivery })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="form-action-title">
      <p className="chapter14-kicker">9.4 Form Action</p>
      <h2 id="form-action-title">Function action and progressive enhancement boundary</h2>
      <form action={submitCheckout} className="chapter14-form">
        <label className="chapter14-field">
          Email
          <input defaultValue="buyer@example.com" name="email" type="email" />
        </label>
        <label className="chapter14-field">
          Delivery
          <select defaultValue="standard" name="delivery">
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </label>
        <button className="chapter14-button" type="submit">
          Submit checkout model
        </button>
      </form>
      <p className="chapter14-result">
        {submittedCheckout
          ? `${submittedCheckout.email} selected ${submittedCheckout.delivery}.`
          : 'No checkout payload submitted.'}
      </p>
      <p className="chapter14-note">
        This Vite example runs a client Action. Server Function replay and no-JavaScript
        progressive enhancement require a supporting framework runtime.
      </p>
    </section>
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
