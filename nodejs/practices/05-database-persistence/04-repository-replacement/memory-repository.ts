import type { CreateNoteRecord, Note, NotesRepository } from "./repository-contract.js";

export class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async create(record: CreateNoteRecord): Promise<Note> {
    const note = {
      id: `note_${this.notes.size + 1}`,
      notebookId: record.notebookId,
      title: record.title,
      body: record.body
    };

    this.notes.set(note.id, note);
    return note;
  }

  async findById(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async listByNotebook(notebookId: string): Promise<Note[]> {
    return [...this.notes.values()].filter((note) => note.notebookId === notebookId);
  }

  async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }
}
