import type { ButtonHTMLAttributes, CSSProperties } from 'react'

const designTokens = {
  color: {
    action: '#0f766e',
    actionHover: '#115e59',
    surface: '#ffffff',
    text: '#16302f',
  },
  radius: {
    control: 6,
  },
  space: {
    controlInline: 14,
    controlBlock: 9,
  },
} as const

type PrimitiveActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  emphasis?: 'primary' | 'quiet'
}

function PrimitiveAction({
  emphasis = 'primary',
  style,
  type = 'button',
  ...buttonProps
}: PrimitiveActionProps) {
  const tokenStyle: CSSProperties = {
    padding: `${designTokens.space.controlBlock}px ${designTokens.space.controlInline}px`,
    border: `1px solid ${designTokens.color.action}`,
    borderRadius: designTokens.radius.control,
    color: emphasis === 'primary' ? designTokens.color.surface : designTokens.color.action,
    backgroundColor:
      emphasis === 'primary' ? designTokens.color.action : designTokens.color.surface,
    font: 'inherit',
    fontWeight: 700,
  }

  return <button {...buttonProps} style={{ ...tokenStyle, ...style }} type={type} />
}

export function DesignTokenPrimitiveBoundary() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.2 Design tokens and primitive UI</p>
      <h2>Tokens carry decisions; primitives carry interaction contracts</h2>
      <p>
        The caller chooses intent and behavior while the primitive owns control-level
        styling defaults.
      </p>
      <div className="chapter15-actions">
        <PrimitiveAction>Publish catalog</PrimitiveAction>
        <PrimitiveAction emphasis="quiet">Save draft</PrimitiveAction>
      </div>
      <p className="chapter15-note">
        Token value: {designTokens.color.action}; hover reference:{' '}
        {designTokens.color.actionHover}
      </p>
    </section>
  )
}
