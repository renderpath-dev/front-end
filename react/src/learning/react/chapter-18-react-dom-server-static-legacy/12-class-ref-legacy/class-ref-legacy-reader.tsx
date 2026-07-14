import { Component, createRef, PureComponent } from 'react'

type LegacyCounterProps = {
  label: string
}

type LegacyCounterState = {
  count: number
}

class LegacyCounter extends Component<LegacyCounterProps, LegacyCounterState> {
  state: LegacyCounterState = { count: 1 }

  render() {
    return (
      <p>
        {this.props.label}: {this.state.count}
      </p>
    )
  }
}

class StableLegacyBadge extends PureComponent<{ label: string }> {
  render() {
    return <span className="dom-boundary-pill">{this.props.label}</span>
  }
}

export function ClassRefLegacyReader() {
  const panelRef = createRef<HTMLDivElement>()

  return (
    <article className="dom-boundary-card" ref={panelRef}>
      <p className="dom-boundary-kicker">9.12 class and ref legacy reading</p>
      <h3>Class instance, PureComponent, createRef, and forwardRef reading</h3>
      <p>
        Class components remain readable in old codebases, but new feature code should prefer
        function components and explicit ref boundaries.
      </p>
      <LegacyCounter label="Legacy class state" />
      <StableLegacyBadge label="PureComponent shallow comparison boundary" />
      <p className="dom-boundary-muted">createRef object current value is assigned by React after commit.</p>
    </article>
  )
}
