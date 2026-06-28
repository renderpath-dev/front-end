import { useRef } from 'react'
import type { KeyboardEvent } from 'react'

export type StatusTabOption<Value extends string> = {
  label: string
  value: Value
}

type StatusTabsProps<Value extends string> = {
  controlsId: string
  label: string
  onChange: (value: Value) => void
  options: readonly StatusTabOption<Value>[]
  value: Value
}

export function StatusTabs<Value extends string>({
  controlsId,
  label,
  onChange,
  options,
  value,
}: StatusTabsProps<Value>) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    event.preventDefault()
    const lastIndex = options.length - 1
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lastIndex
          : event.key === 'ArrowLeft'
            ? (index - 1 + options.length) % options.length
            : (index + 1) % options.length
    const nextOption = options[nextIndex]

    if (nextOption) {
      onChange(nextOption.value)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div aria-label={label} className="sellerhub-status-tabs" role="tablist">
      {options.map((option, index) => (
        <button
          aria-controls={controlsId}
          aria-selected={option.value === value}
          className="sellerhub-status-tab"
          id={`${controlsId}-${option.value}-tab`}
          key={option.value}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(node) => {
            tabRefs.current[index] = node
          }}
          role="tab"
          tabIndex={option.value === value ? 0 : -1}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
