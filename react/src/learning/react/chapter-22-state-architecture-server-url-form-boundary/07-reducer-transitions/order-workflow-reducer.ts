export type OrderWorkflowState =
  | { status: 'draft'; selectedOrderId: string | null }
  | { status: 'reviewing'; selectedOrderId: string }
  | { status: 'submitting'; selectedOrderId: string }
  | { status: 'confirmed'; selectedOrderId: string; confirmationCode: string }
  | { status: 'failed'; selectedOrderId: string; message: string }

export type OrderWorkflowAction =
  | { type: 'select'; orderId: string }
  | { type: 'review' }
  | { type: 'submit' }
  | { type: 'confirm'; confirmationCode: string }
  | { type: 'fail'; message: string }
  | { type: 'reset' }

export const initialOrderWorkflowState: OrderWorkflowState = {
  status: 'draft',
  selectedOrderId: null,
}

export function orderWorkflowReducer(
  state: OrderWorkflowState,
  action: OrderWorkflowAction,
): OrderWorkflowState {
  switch (action.type) {
    case 'select': {
      return { status: 'draft', selectedOrderId: action.orderId }
    }

    case 'review': {
      if (state.status === 'draft' && state.selectedOrderId !== null) {
        return { status: 'reviewing', selectedOrderId: state.selectedOrderId }
      }

      return state
    }

    case 'submit': {
      if (state.status === 'reviewing') {
        return { status: 'submitting', selectedOrderId: state.selectedOrderId }
      }

      return state
    }

    case 'confirm': {
      if (state.status === 'submitting') {
        return {
          status: 'confirmed',
          selectedOrderId: state.selectedOrderId,
          confirmationCode: action.confirmationCode,
        }
      }

      return state
    }

    case 'fail': {
      if (state.status === 'submitting') {
        return {
          status: 'failed',
          selectedOrderId: state.selectedOrderId,
          message: action.message,
        }
      }

      return state
    }

    case 'reset': {
      return initialOrderWorkflowState
    }

    default: {
      return assertNever(action)
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`Unsupported order workflow action: ${JSON.stringify(value)}`)
}
