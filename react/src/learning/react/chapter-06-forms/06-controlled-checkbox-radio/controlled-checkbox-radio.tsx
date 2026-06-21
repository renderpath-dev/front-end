import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ProductCondition = 'new' | 'used'

export function ControlledCheckboxRadio() {
  const [isPublished, setIsPublished] = useState(false)
  const [condition, setCondition] = useState<ProductCondition>('new')

  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsPublished(event.currentTarget.checked)
  }

  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {
    setCondition(event.currentTarget.value as ProductCondition)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Boolean and choice controls</p>
      <h3>Checkbox and radio state</h3>
      <label className="inline-choice">
        <input checked={isPublished} onChange={handlePublishedChange} type="checkbox" />
        Publish immediately
      </label>
      <fieldset>
        <legend>Condition</legend>
        <label className="inline-choice">
          <input
            checked={condition === 'new'}
            name="condition"
            onChange={handleConditionChange}
            type="radio"
            value="new"
          />
          New
        </label>
        <label className="inline-choice">
          <input
            checked={condition === 'used'}
            name="condition"
            onChange={handleConditionChange}
            type="radio"
            value="used"
          />
          Used
        </label>
      </fieldset>
      <p>
        {condition} · {isPublished ? 'Published' : 'Draft'}
      </p>
    </section>
  )
}
