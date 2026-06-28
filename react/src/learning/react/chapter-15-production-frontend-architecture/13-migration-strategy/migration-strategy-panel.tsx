type MigrationPhase = 'inventory' | 'compatibility' | 'migration' | 'retirement'
type MigrationRisk = 'low' | 'medium' | 'high'

type MigrationWorkItem = {
  id: string
  phase: MigrationPhase
  target: string
  risk: MigrationRisk
  rollback: string
}

const migrationWorkItems: MigrationWorkItem[] = [
  {
    id: 'migration-01',
    phase: 'inventory',
    target: 'Deep feature imports',
    risk: 'medium',
    rollback: 'Keep existing exports while inventory is reviewed.',
  },
  {
    id: 'migration-02',
    phase: 'compatibility',
    target: 'Catalog API adapter',
    risk: 'high',
    rollback: 'Route calls through the legacy mapper.',
  },
  {
    id: 'migration-03',
    phase: 'migration',
    target: 'Token-driven primitives',
    risk: 'medium',
    rollback: 'Restore component-level CSS variables.',
  },
  {
    id: 'migration-04',
    phase: 'retirement',
    target: 'Legacy shared business helpers',
    risk: 'low',
    rollback: 'Revert the deletion commit before release.',
  },
]

export function MigrationStrategyPanel() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.13 Migration strategy</p>
      <h2>Inventory, compatibility, migration, and retirement remain reversible</h2>
      <ol className="chapter15-timeline">
        {migrationWorkItems.map((workItem) => (
          <li key={workItem.id}>
            <span>{workItem.phase}</span>
            <strong>{workItem.target}</strong>
            <small>Risk: {workItem.risk}</small>
            <p>Rollback: {workItem.rollback}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
