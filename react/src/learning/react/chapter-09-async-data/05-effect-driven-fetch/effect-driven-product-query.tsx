import { useEffect, useState } from 'react'

type Category = 'lighting' | 'office' | 'audio'

type CategoryState =
  | { status: 'pending'; products: string[] }
  | { status: 'success'; products: string[] }
  | { status: 'empty'; products: string[] }
  | { status: 'error'; products: string[]; message: string }

const categoryProducts: Record<Category, string[]> = {
  lighting: ['Desk Lamp', 'Floor Lamp'],
  office: ['Monitor Stand', 'Mechanical Keyboard'],
  audio: [],
}

function loadCategoryProducts(category: Category): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(categoryProducts[category]), 500)
  })
}

export function EffectDrivenProductQuery() {
  const [category, setCategory] = useState<Category>('lighting')
  const [state, setState] = useState<CategoryState>({ status: 'pending', products: [] })

  useEffect(() => {
    let ignore = false

    loadCategoryProducts(category)
      .then((products) => {
        if (ignore) return
        setState(
          products.length === 0
            ? { status: 'empty', products: [] }
            : { status: 'success', products },
        )
      })
      .catch((error: unknown) => {
        if (ignore) return
        setState((current) => ({
          status: 'error',
          products: current.products,
          message: error instanceof Error ? error.message : 'Unknown category error',
        }))
      })

    return () => {
      ignore = true
    }
  }, [category])

  function handleCategoryChange(nextCategory: Category) {
    setCategory(nextCategory)
    setState((current) => ({ status: 'pending', products: current.products }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Effect-driven request</p>
      <h3>Synchronize results with committed criteria</h3>
      <label>
        Category
        <select
          value={category}
          onChange={(event) => handleCategoryChange(event.currentTarget.value as Category)}
        >
          <option value="lighting">Lighting</option>
          <option value="office">Office</option>
          <option value="audio">Audio</option>
        </select>
      </label>
      <p>Status: {state.status}</p>
      <p>{state.products.join(', ') || 'No products'}</p>
    </article>
  )
}
