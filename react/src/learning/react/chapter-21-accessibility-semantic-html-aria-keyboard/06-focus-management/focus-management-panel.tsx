import { useRef, useState } from 'react'

export function FocusManagementPanel() {
  const [message, setMessage] = useState('Focus repair has not run yet.')
  const invalidFieldRef = useRef<HTMLInputElement>(null)

  function focusInvalidField() {
    setMessage('Focus moved to the invalid order reference field.')
    invalidFieldRef.current?.focus()
  }

  return (
    <section className="a11y-card" aria-labelledby="focus-management-title">
      <p className="a11y-card-kicker">9.6</p>
      <h3 id="focus-management-title">Focus management</h3>
      <p>
        Focus repair uses DOM refs after a state change. It should fix broken flow, not
        hijack a user who is already navigating.
      </p>
      <label>
        Order reference
        <input ref={invalidFieldRef} defaultValue="" />
      </label>
      <button type="button" onClick={focusInvalidField}>
        Focus invalid order reference
      </button>
      <p role="status">{message}</p>
    </section>
  )
}
