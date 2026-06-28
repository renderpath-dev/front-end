import type { ReactNode } from 'react'

type FieldProps = {
  children: ReactNode
  error?: string
  hint?: string
  htmlFor: string
  label: string
}

export function Field({ children, error, hint, htmlFor, label }: FieldProps) {
  const messageId = `${htmlFor}-message`

  return (
    <div className="sellerhub-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {(error || hint) && (
        <p
          className={error ? 'sellerhub-field-error' : 'sellerhub-field-hint'}
          id={messageId}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
