import type { ProductFormValues } from './product-form-types'

type ProductFormPreviewProps = {
  values: ProductFormValues
}

export function ProductFormPreview({ values }: ProductFormPreviewProps) {
  const numericPrice = Number(values.price)
  const displayPrice = Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : '0.00'

  return (
    <aside className="product-preview" aria-labelledby="product-preview-title">
      <p className="preview-label">Derived preview</p>
      <h3 id="product-preview-title">{values.name.trim() || 'Untitled product'}</h3>
      <p>{values.description.trim() || 'Add a description to preview the listing.'}</p>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>{values.category}</dd>
        </div>
        <div>
          <dt>Condition</dt>
          <dd>{values.condition}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>${displayPrice}</dd>
        </div>
        <div>
          <dt>Visibility</dt>
          <dd>{values.isPublished ? 'Published' : 'Draft'}</dd>
        </div>
      </dl>
    </aside>
  )
}
