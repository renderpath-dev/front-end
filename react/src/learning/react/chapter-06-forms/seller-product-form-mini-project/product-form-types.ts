export const productCategories = ['electronics', 'home', 'office'] as const
export const productConditions = ['new', 'used'] as const

export type ProductCategory = (typeof productCategories)[number]
export type ProductCondition = (typeof productConditions)[number]

export type ProductFormValues = {
  name: string
  description: string
  category: ProductCategory
  condition: ProductCondition
  price: string
  isPublished: boolean
}

export type ProductFormFieldName = keyof ProductFormValues
export type ProductFormErrors = Partial<Record<ProductFormFieldName, string>>

export type ProductFormSubmission =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; submittedName: string }

export const initialProductFormValues: ProductFormValues = {
  name: 'Aurora Desk Lamp',
  description: 'A compact task light with adjustable brightness.',
  category: 'home',
  condition: 'new',
  price: '49.00',
  isPublished: false,
}
