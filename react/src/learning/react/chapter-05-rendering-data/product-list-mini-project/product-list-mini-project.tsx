import { useState } from 'react'
import { ProductFilterControls } from './product-filter-controls'
import { ProductGrid } from './product-grid'
import { ProductListSummary } from './product-list-summary'
import { productCategoryOptions, productListSeedData } from './product-list-seed-data'
import type { CategoryFilter } from './product-list-types'
import './product-list-mini-project.css'

export function ProductListMiniProject() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')

  const visibleProducts = productListSeedData.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory,
  )

  return (
    <section className="product-list-panel">
      <div className="product-list-header">
        <div>
          <p className="product-list-eyebrow">SellerHub learning connection</p>
          <h2>Product List Panel</h2>
          <p>
            Stable product IDs, derived category results, and explicit empty and stock
            states.
          </p>
        </div>
        <ProductListSummary
          visibleCount={visibleProducts.length}
          totalCount={productListSeedData.length}
        />
      </div>

      <ProductFilterControls
        options={productCategoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductGrid products={visibleProducts} />
    </section>
  )
}
