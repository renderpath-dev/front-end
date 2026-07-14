import { useState } from 'react'
import {
  confirmOptimisticNote,
  createOptimisticNote,
  rollbackOptimisticNote,
} from '../14-optimistic-rollback/optimistic-note-model'
import type { OrderNote } from '../14-optimistic-rollback/optimistic-note-model'

export function OptimisticNoteMutationPanel() {
  const [notes, setNotes] = useState<readonly OrderNote[]>([])

  function addPendingNote(): void {
    setNotes((currentNotes) =>
      createOptimisticNote(currentNotes, 'Call customer before shipping', 'temp-1'),
    )
  }

  function confirmNote(): void {
    setNotes((currentNotes) =>
      confirmOptimisticNote(currentNotes, 'temp-1', {
        id: 'note-900',
        kind: 'confirmed',
        message: 'Call customer before shipping',
      }),
    )
  }

  function rollbackNote(): void {
    setNotes((currentNotes) => rollbackOptimisticNote(currentNotes, 'temp-1'))
  }

  return (
    <section className="data-fetching-card" aria-labelledby="optimistic-note-title">
      <h3 id="optimistic-note-title">Optimistic order note mutation panel</h3>
      <button onClick={addPendingNote} type="button">
        Add pending note
      </button>
      <button onClick={confirmNote} type="button">
        Confirm note
      </button>
      <button onClick={rollbackNote} type="button">
        Roll back note
      </button>
      <p role="status">Notes: {notes.length}</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.message} - {note.kind}
          </li>
        ))}
      </ul>
    </section>
  )
}
