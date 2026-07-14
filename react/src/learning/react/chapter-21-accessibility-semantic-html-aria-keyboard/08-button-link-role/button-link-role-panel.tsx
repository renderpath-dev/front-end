import { useState } from 'react'
import type { KeyboardEvent } from 'react'

export function ButtonLinkRolePanel() {
  const [activationCount, setActivationCount] = useState(0)

  function activateRoleButton() {
    setActivationCount((currentCount) => currentCount + 1)
  }

  function handleRoleButtonKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activateRoleButton()
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="button-link-role-title">
      <p className="a11y-card-kicker">9.8</p>
      <h3 id="button-link-role-title">Button vs link vs custom role</h3>
      <p>
        A button performs an action. A link navigates. A custom role button is a last
        resort and must implement keyboard activation.
      </p>
      <div className="a11y-example-pair">
        <button type="button">Save settings</button>
        <a href="/react/chapter-21">Read Chapter 21</a>
        <div
          className="a11y-custom-button"
          onClick={activateRoleButton}
          onKeyDown={handleRoleButtonKeyDown}
          role="button"
          tabIndex={0}
        >
          Custom activation count: {activationCount}
        </div>
      </div>
    </section>
  )
}
