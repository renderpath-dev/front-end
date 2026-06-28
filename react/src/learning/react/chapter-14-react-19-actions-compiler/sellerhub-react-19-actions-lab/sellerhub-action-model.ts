import type {
  CartActionState,
  CartMutation,
  CheckoutActionState,
  ProductReview,
} from './sellerhub-action-types'

export const initialCheckoutState: CheckoutActionState = {
  status: 'idle',
  message: 'Checkout has not been submitted.',
  sequence: 0,
}

export const initialCartState: CartActionState = {
  lines: [
    {
      productId: 'product-lamp',
      productName: 'Desk Lamp',
      quantity: 1,
    },
  ],
  completedMutationIds: [],
  message: 'No cart mutation has completed.',
}

export const initialReviews: ProductReview[] = [
  {
    id: 'review-1',
    text: 'Accurate description and fast dispatch.',
    status: 'confirmed',
  },
]

export async function submitCheckoutAction(
  previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const email = readFormString(formData, 'email').trim()
  const delivery = readFormString(formData, 'delivery')
  await wait(650)

  if (!email.includes('@')) {
    return {
      status: 'error',
      message: 'Enter a valid checkout email.',
      sequence: previousState.sequence + 1,
    }
  }

  return {
    status: 'success',
    message: `Checkout accepted with ${delivery} delivery.`,
    sequence: previousState.sequence + 1,
    email,
  }
}

export async function updateCartAction(
  previousState: CartActionState,
  mutation: CartMutation,
): Promise<CartActionState> {
  await wait(mutation.delta > 0 ? 600 : 350)

  const nextLines = previousState.lines.map((line) =>
    line.productId === mutation.productId
      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }
      : line,
  )

  return {
    lines: nextLines,
    completedMutationIds: [
      ...previousState.completedMutationIds,
      mutation.mutationId,
    ],
    message: `${mutation.mutationId} reconciled with the Action result.`,
  }
}

export async function confirmReview(
  reviewId: string,
  text: string,
): Promise<ProductReview | null> {
  await wait(700)

  if (!text || text.toLowerCase().includes('fail')) {
    return null
  }

  return {
    id: reviewId,
    text,
    status: 'confirmed',
  }
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
