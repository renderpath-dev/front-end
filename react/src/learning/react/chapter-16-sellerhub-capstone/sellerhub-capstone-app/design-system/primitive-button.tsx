import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimitiveButtonProps = {
  children: ReactNode
  tone?: 'primary' | 'secondary' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PrimitiveButton({
  children,
  className = '',
  tone = 'primary',
  type = 'button',
  ...buttonProps
}: PrimitiveButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`sellerhub-button sellerhub-button-${tone} ${className}`.trim()}
      type={type}
    >
      {children}
    </button>
  )
}
