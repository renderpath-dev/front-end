import { useState } from 'react'

const dashboardTabs = ['Revenue', 'Inventory', 'Risk'] as const

export function DashboardSelectionStatePanel() {
  const [activeTab, setActiveTab] = useState<(typeof dashboardTabs)[number]>('Revenue')

  return (
    <section className="state-lab-card" aria-labelledby="dashboard-selection-title">
      <p className="state-card-kicker">Final lab part 5</p>
      <h3 id="dashboard-selection-title">Dashboard selection state panel</h3>
      <div className="state-button-row" role="tablist" aria-label="Dashboard metric groups">
        {dashboardTabs.map((tab) => (
          <button
            aria-selected={activeTab === tab}
            key={tab}
            role="tab"
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <p role="tabpanel">Active dashboard tab: {activeTab}</p>
    </section>
  )
}
