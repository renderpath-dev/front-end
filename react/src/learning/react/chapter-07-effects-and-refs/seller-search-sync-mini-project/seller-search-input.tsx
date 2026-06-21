import type { ChangeEvent, RefObject } from 'react'
import type { SellerProductCategory } from './seller-search-types'
import { sellerProductCategories } from './seller-search-data'

type SellerSearchInputProps = {
  category: SellerProductCategory
  inputRef: RefObject<HTMLInputElement | null>
  onCategoryChange: (category: SellerProductCategory) => void
  onQueryChange: (query: string) => void
  query: string
}

export function SellerSearchInput({
  category,
  inputRef,
  onCategoryChange,
  onQueryChange,
  query,
}: SellerSearchInputProps) {
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.currentTarget.value)
  }

  return (
    <div className="seller-search-controls">
      <label>
        Product query
        <input
          onChange={handleQueryChange}
          placeholder="Search product names"
          ref={inputRef}
          value={query}
        />
      </label>

      <label>
        Category
        <select
          onChange={(event) =>
            onCategoryChange(event.currentTarget.value as SellerProductCategory)
          }
          value={category}
        >
          {sellerProductCategories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
