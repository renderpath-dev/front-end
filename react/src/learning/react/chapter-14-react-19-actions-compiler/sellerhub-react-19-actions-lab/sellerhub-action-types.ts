export type CheckoutActionState =
  | {
      status: 'idle'
      message: string
      sequence: number
    }
  | {
      status: 'success'
      message: string
      sequence: number
      email: string
    }
  | {
      status: 'error'
      message: string
      sequence: number
    }

export type CartLine = {
  productId: string
  productName: string
  quantity: number
}

export type CartMutation = {
  productId: string
  delta: number
  mutationId: string
}

export type CartActionState = {
  lines: CartLine[]
  completedMutationIds: string[]
  message: string
}

export type ProductReview = {
  id: string
  text: string
  status: 'pending' | 'confirmed'
}
