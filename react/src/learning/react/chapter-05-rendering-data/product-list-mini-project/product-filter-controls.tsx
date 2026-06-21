import type { CategoryFilter, CategoryOption } from './product-list-types'

type ProductFilterControlsProps = {
  options: ReadonlyArray<CategoryOption>
  selectedCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
}

export function ProductFilterControls({
  options,
  selectedCategory,
  onCategoryChange,
}: ProductFilterControlsProps) {
  return (
    <div className="product-filter-controls" aria-label="Product category filter">
      {options.map((option) => (
        <button
          className={option.value === selectedCategory ? 'is-selected' : undefined}
          key={option.value}
          type="button"
          onClick={() => onCategoryChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
