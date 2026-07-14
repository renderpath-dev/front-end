import { startTransition, useMemo, useState, useTransition } from 'react'

const sellerTasks = [
  { id: 'task-1', label: 'Refresh catalog margins', category: 'Catalog', effort: 7 },
  { id: 'task-2', label: 'Review delayed shipments', category: 'Orders', effort: 9 },
  { id: 'task-3', label: 'Recalculate dashboard targets', category: 'Dashboard', effort: 6 },
  { id: 'task-4', label: 'Audit catalog media', category: 'Catalog', effort: 5 },
  { id: 'task-5', label: 'Escalate buyer support cases', category: 'Orders', effort: 8 },
]

const categories = ['All', 'Catalog', 'Orders', 'Dashboard'] as const

export function TransitionFilterWorkspace() {
  const [urgentCategory, setUrgentCategory] = useState<(typeof categories)[number]>('All')
  const [visibleCategory, setVisibleCategory] = useState<(typeof categories)[number]>('All')
  const [warehouseMode, setWarehouseMode] = useState('Normal')
  const [isPending, startSelectionTransition] = useTransition()

  const visibleTasks = useMemo(() => {
    return sellerTasks
      .filter((task) => visibleCategory === 'All' || task.category === visibleCategory)
      .map((task) => ({
        ...task,
        weightedEffort: calculateTransitionWork(task.effort, visibleCategory),
      }))
  }, [visibleCategory])

  function handleCategoryChange(nextCategory: (typeof categories)[number]) {
    setUrgentCategory(nextCategory)
    startSelectionTransition(() => {
      setVisibleCategory(nextCategory)
    })
  }

  function toggleWarehouseMode() {
    startTransition(() => {
      setWarehouseMode((currentMode) => (currentMode === 'Normal' ? 'High volume' : 'Normal'))
    })
  }

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useTransition and startTransition</p>
      <h3>Transition filter workspace</h3>
      <form className="api-gap-form">
        <label htmlFor="transition-category">Urgent category input</label>
        <select
          id="transition-category"
          onChange={(event) =>
            handleCategoryChange(event.currentTarget.value as (typeof categories)[number])
          }
          value={urgentCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
      <div className="api-gap-button-row">
        <button className="api-gap-button api-gap-button-secondary" onClick={toggleWarehouseMode} type="button">
          Toggle warehouse mode
        </button>
      </div>
      <div className="api-gap-pill-row" aria-live="polite">
        <span className={`api-gap-pill${isPending ? ' api-gap-pill-warning' : ''}`}>
          {isPending ? 'Transition pending' : 'Transition committed'}
        </span>
        <span className="api-gap-pill">Visible: {visibleCategory}</span>
        <span className="api-gap-pill">Mode: {warehouseMode}</span>
      </div>
      <ul className="api-gap-list" aria-label="Transition filtered tasks">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.label}</strong>
            <br />
            <span>
              {task.category} · weighted effort {task.weightedEffort}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function calculateTransitionWork(effort: number, category: string): number {
  let weightedEffort = effort

  for (let step = 0; step < 900; step += 1) {
    weightedEffort += category.length + (step % 5)
  }

  return weightedEffort
}
