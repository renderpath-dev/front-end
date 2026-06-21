import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ProductCategory = 'electronics' | 'home' | 'office'

type ProductDetails = {
  description: string
  category: ProductCategory
}

const initialProductDetails: ProductDetails = {
  description: 'A compact lamp for focused desk lighting.',
  category: 'home',
}

export function ControlledTextareaSelect() {
  const [details, setDetails] = useState(initialProductDetails)

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setDetails((currentDetails) => ({
      ...currentDetails,
      description: event.currentTarget.value,
    }))
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    setDetails((currentDetails) => ({
      ...currentDetails,
      category: event.currentTarget.value as ProductCategory,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Text area and select</p>
      <h3>Different controls use the same value loop</h3>
      <div className="stacked-fields">
        <label>
          Description
          <textarea onChange={handleDescriptionChange} value={details.description} />
        </label>
        <label>
          Category
          <select onChange={handleCategoryChange} value={details.category}>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </label>
      </div>
      <p>
        {details.category}: {details.description.length} characters
      </p>
    </section>
  )
}
