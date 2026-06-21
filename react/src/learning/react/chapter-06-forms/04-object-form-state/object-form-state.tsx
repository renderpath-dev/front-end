import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ShopFormValues = {
  shopName: string
  supportEmail: string
}

type ShopTextFieldName = keyof ShopFormValues

const initialShopFormValues: ShopFormValues = {
  shopName: 'Northstar Goods',
  supportEmail: 'support@example.com',
}

export function ObjectFormState() {
  const [formValues, setFormValues] = useState(initialShopFormValues)

  function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {
    const fieldName = event.currentTarget.name as ShopTextFieldName
    const fieldValue = event.currentTarget.value

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Object state</p>
      <h3>Related fields update immutably</h3>
      <div className="stacked-fields">
        <label>
          Shop name
          <input name="shopName" onChange={handleTextChange} value={formValues.shopName} />
        </label>
        <label>
          Support email
          <input
            name="supportEmail"
            onChange={handleTextChange}
            type="email"
            value={formValues.supportEmail}
          />
        </label>
      </div>
      <p>
        {formValues.shopName} · {formValues.supportEmail}
      </p>
    </section>
  )
}
