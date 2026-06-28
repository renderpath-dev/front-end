import { Component } from 'react'
import type { ReactNode } from 'react'

type RenderErrorBoundaryProps = {
  children: ReactNode
}

type RenderErrorBoundaryState = {
  hasError: boolean
}

export class RenderErrorBoundary extends Component<
  RenderErrorBoundaryProps,
  RenderErrorBoundaryState
> {
  state: RenderErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): RenderErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(): void {}

  render() {
    if (this.state.hasError) {
      return <p role="alert">SellerHub section failed to render.</p>
    }

    return this.props.children
  }
}

export function CrashingSellerWidget(): ReactNode {
  throw new Error('Seller widget render failed')
}
