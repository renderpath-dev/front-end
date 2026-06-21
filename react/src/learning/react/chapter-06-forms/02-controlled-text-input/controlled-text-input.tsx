import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function ControlledTextInput() {
  const [productName, setProductName] = useState('Desk Lamp')

  function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setProductName(event.currentTarget.value)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Controlled value</p>
      <h3>Text input follows React state</h3>
      <label>
        Product name
        <input onChange={handleProductNameChange} value={productName} />
      </label>
      <p>
        Current render snapshot: <strong>{productName || 'Empty value'}</strong>
      </p>
    </section>
  )
}
