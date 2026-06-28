import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

type TabId = 'contract' | 'keyboard' | 'ownership'

type TabDefinition = {
  id: TabId
  label: string
  content: string
}

const tabDefinitions: TabDefinition[] = [
  {
    id: 'contract',
    label: 'Contract',
    content: 'The compound component owns roles, ids, and selected state.',
  },
  {
    id: 'keyboard',
    label: 'Keyboard',
    content: 'Arrow keys move focus and activate the next tab.',
  },
  {
    id: 'ownership',
    label: 'Ownership',
    content: 'Consumers provide content without rebuilding accessibility wiring.',
  },
]

export function AccessibleCompoundTabs() {
  const [activeTabId, setActiveTabId] = useState<TabId>('contract')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTab = tabDefinitions.find((tab) => tab.id === activeTabId)!

  function activateTab(index: number): void {
    const nextTab = tabDefinitions[index]
    setActiveTabId(nextTab.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    let nextIndex = index

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabDefinitions.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabDefinitions.length) % tabDefinitions.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabDefinitions.length - 1
    } else {
      return
    }

    event.preventDefault()
    activateTab(nextIndex)
  }

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.3 Compound component accessibility</p>
      <h2>One owner coordinates tab semantics and focus behavior</h2>
      <div aria-label="Accessibility contract topics" className="chapter15-tabs" role="tablist">
        {tabDefinitions.map((tab, index) => (
          <button
            aria-controls={`chapter15-panel-${tab.id}`}
            aria-selected={tab.id === activeTabId}
            className="chapter15-tab"
            id={`chapter15-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            role="tab"
            tabIndex={tab.id === activeTabId ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`chapter15-tab-${activeTab.id}`}
        className="chapter15-tab-panel"
        id={`chapter15-panel-${activeTab.id}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeTab.content}
      </div>
    </section>
  )
}
