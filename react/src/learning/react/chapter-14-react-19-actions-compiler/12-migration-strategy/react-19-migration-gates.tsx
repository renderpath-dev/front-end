import { useState } from 'react'

type MigrationGate = {
  id: string
  label: string
  evidence: string
}

const migrationGates: MigrationGate[] = [
  {
    id: 'baseline',
    label: 'Record current behavior and performance evidence',
    evidence: 'Chapter 11 Profiler and existing behavior tests',
  },
  {
    id: 'quality',
    label: 'Pass lint, typecheck, test, and build',
    evidence: 'Chapter 12 quality gates',
  },
  {
    id: 'actions',
    label: 'Adopt one Action boundary at a time',
    evidence: 'Pending, result, error, and rollback behavior',
  },
  {
    id: 'compiler',
    label: 'Enable compiler only after a separate configuration review',
    evidence: 'No compiler package is installed in this chapter',
  },
  {
    id: 'memo',
    label: 'Remove manual memoization only after profiling and tests',
    evidence: 'preserve-manual-memoization remains a migration signal',
  },
]

export function React19MigrationGates() {
  const [completedGateIds, setCompletedGateIds] = useState<string[]>([])

  function toggleGate(gateId: string): void {
    setCompletedGateIds((currentIds) =>
      currentIds.includes(gateId)
        ? currentIds.filter((currentId) => currentId !== gateId)
        : [...currentIds, gateId],
    )
  }

  return (
    <section className="chapter14-panel" aria-labelledby="migration-title">
      <p className="chapter14-kicker">9.12 Migration strategy</p>
      <h2 id="migration-title">Quality gates before API and compiler rollout</h2>
      <ul className="chapter14-checklist">
        {migrationGates.map((gate) => (
          <li key={gate.id}>
            <label>
              <input
                checked={completedGateIds.includes(gate.id)}
                onChange={() => toggleGate(gate.id)}
                type="checkbox"
              />
              <span>
                <strong>{gate.label}</strong>
                <small>{gate.evidence}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="chapter14-note">
        Completed gates: {completedGateIds.length} / {migrationGates.length}
      </p>
    </section>
  )
}
