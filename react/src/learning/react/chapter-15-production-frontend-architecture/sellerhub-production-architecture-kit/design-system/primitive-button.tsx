import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { sellerHubTokens } from './tokens'

type PrimitiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'primary' | 'quiet' | 'danger'
}

const toneStyles: Record<NonNullable<PrimitiveButtonProps['tone']>, CSSProperties> = {
  primary: {
    borderColor: sellerHubTokens.color.action,
    color: sellerHubTokens.color.surface,
    backgroundColor: sellerHubTokens.color.action,
  },
  quiet: {
    borderColor: sellerHubTokens.color.action,
    color: sellerHubTokens.color.action,
    backgroundColor: sellerHubTokens.color.surface,
  },
  danger: {
    borderColor: sellerHubTokens.color.danger,
    color: sellerHubTokens.color.surface,
    backgroundColor: sellerHubTokens.color.danger,
  },
}

export function PrimitiveButton({
  style,
  tone = 'primary',
  type = 'button',
  ...buttonProps
}: PrimitiveButtonProps) {
  const primitiveStyle: CSSProperties = {
    minHeight: 40,
    padding: `${sellerHubTokens.space.controlBlock}px ${sellerHubTokens.space.controlInline}px`,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: sellerHubTokens.radius.control,
    font: 'inherit',
    fontWeight: 750,
    cursor: 'pointer',
    ...toneStyles[tone],
    ...style,
  }

  return <button {...buttonProps} style={primitiveStyle} type={type} />
}
