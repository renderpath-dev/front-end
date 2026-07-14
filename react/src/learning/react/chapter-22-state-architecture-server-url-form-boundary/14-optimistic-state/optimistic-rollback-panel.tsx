import { useState } from 'react'

type OrderNote = {
  id: string
  text: string
  optimistic: boolean
}

export function OptimisticRollbackPanel() {
  const [notes, setNotes] = useState<OrderNote[]>([
    { id: 'note-1', text: 'Packed by warehouse team', optimistic: false },
  ])

  function addOptimisticNote(): void {
    setNotes((currentNotes) => [
      ...currentNotes,
      { id: `pending-${currentNotes.length + 1}`, text: 'Buyer requested gift wrap', optimistic: true },
    ])
  }

  function rollbackPendingNotes(): void {
    setNotes((currentNotes) => currentNotes.filter((note) => !note.optimistic))
  }

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.14 rollback boundary</p>
      <h3>Optimistic state and rollback</h3>
      <div className="state-button-row">
        <button type="button" onClick={addOptimisticNote}>
          Add optimistic note
        </button>
        <button type="button" onClick={rollbackPendingNotes}>
          Roll back pending notes
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.optimistic ? `${note.text} pending` : note.text}</li>
        ))}
      </ul>
    </article>
  )
}
