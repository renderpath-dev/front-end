import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

export type CompoundTabDefinition = {
  id: string
  label: string
  content: ReactNode
}

type CompoundTabsProps = {
  activeId: string
  ariaLabel: string
  onChange: (tabId: string) => void
  tabs: CompoundTabDefinition[]
}

export function CompoundTabs({
  activeId,
  ariaLabel,
  onChange,
  tabs,
}: CompoundTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  function activate(index: number): void {
    const tab = tabs[index]
    onChange(tab.id)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    activate(nextIndex)
  }

  return (
    <div>
      <div aria-label={ariaLabel} className="chapter15-tabs" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-controls={`kit-panel-${tab.id}`}
            aria-selected={tab.id === activeTab.id}
            className="chapter15-tab"
            id={`kit-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            role="tab"
            tabIndex={tab.id === activeTab.id ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`kit-tab-${activeTab.id}`}
        className="chapter15-tab-panel"
        id={`kit-panel-${activeTab.id}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeTab.content}
      </div>
    </div>
  )
}
