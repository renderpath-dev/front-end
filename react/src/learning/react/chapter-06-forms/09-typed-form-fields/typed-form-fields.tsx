import { useState } from 'react'
import type { ChangeEvent } from 'react'

type RegisterFormValues = {
  displayName: string
  email: string
}

type RegisterTextFieldName = keyof RegisterFormValues

const initialRegisterFormValues: RegisterFormValues = {
  displayName: '',
  email: '',
}

export function TypedFormFields() {
  const [formValues, setFormValues] = useState(initialRegisterFormValues)

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>): void {
    const fieldName = event.currentTarget.name as RegisterTextFieldName

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: event.currentTarget.value,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">TypeScript boundary</p>
      <h3>Event, values, and field names have different types</h3>
      <div className="stacked-fields">
        <label>
          Display name
          <input name="displayName" onChange={handleFieldChange} value={formValues.displayName} />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={handleFieldChange}
            type="email"
            value={formValues.email}
          />
        </label>
      </div>
      <p>
        {formValues.displayName || 'Unnamed seller'} · {formValues.email || 'No email'}
      </p>
    </section>
  )
}
