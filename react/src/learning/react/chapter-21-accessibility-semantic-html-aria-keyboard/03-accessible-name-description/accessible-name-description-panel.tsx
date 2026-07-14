import { useId } from 'react'

export function AccessibleNameDescriptionPanel() {
  const fieldId = useId()
  const helpId = `${fieldId}-help`

  return (
    <section className="a11y-card" aria-labelledby="accessible-name-title">
      <p className="a11y-card-kicker">9.3</p>
      <h3 id="accessible-name-title">Accessible name and description</h3>
      <p>
        Labels provide names. Descriptions add supporting text. React useId avoids duplicated
        hardcoded IDs when the field component is rendered more than once.
      </p>
      <label htmlFor={fieldId}>Seller email</label>
      <input
        aria-describedby={helpId}
        id={fieldId}
        name="sellerEmail"
        placeholder="seller@example.com"
        type="email"
      />
      <p id={helpId}>Use the email address where SellerHub sends order alerts.</p>
      <p className="a11y-muted">The placeholder is an example value, not the label.</p>
    </section>
  )
}
