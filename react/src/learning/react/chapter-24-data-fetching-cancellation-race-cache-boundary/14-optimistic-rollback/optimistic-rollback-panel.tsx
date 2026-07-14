import { createOptimisticNote, rollbackOptimisticNote } from './optimistic-note-model'

export function OptimisticRollbackPanel() {
  const optimisticNotes = createOptimisticNote([], 'Call customer before shipping', 'temp-1')
  const rolledBackNotes = rollbackOptimisticNote(optimisticNotes, 'temp-1')

  return (
    <section className="data-fetching-card" aria-labelledby="optimistic-title">
      <p className="data-fetching-card__eyebrow">9.14</p>
      <h2 id="optimistic-title">Optimistic update and rollback</h2>
      <p>
        Optimistic UI stores pending intent separately from confirmed server data. On
        failure, rollback removes the temporary item and keeps server authority honest.
      </p>
      <p>
        Notes after rollback: <strong>{rolledBackNotes.length}</strong>.
      </p>
    </section>
  )
}
