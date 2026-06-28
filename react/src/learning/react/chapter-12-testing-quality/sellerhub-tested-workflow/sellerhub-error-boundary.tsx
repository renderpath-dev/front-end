import { Component } from 'react'
import type { ReactNode } from 'react'

type SellerHubErrorBoundaryProps = {
  children: ReactNode
}

type SellerHubErrorBoundaryState = {
  hasError: boolean
}

export class SellerHubErrorBoundary extends Component<
  SellerHubErrorBoundaryProps,
  SellerHubErrorBoundaryState
> {
  state: SellerHubErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SellerHubErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(): void {}

  render() {
    if (this.state.hasError) {
      return <p role="alert">SellerHub workflow failed to render.</p>
    }

    return this.props.children
  }
}

export function BrokenWorkflowPanel(): ReactNode {
  throw new Error('Workflow panel render failed')
}
