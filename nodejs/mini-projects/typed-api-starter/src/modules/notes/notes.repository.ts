import { randomUUID } from "node:crypto";
import type { CreateNoteRecord, Note, NotesRepository, UpdateNoteRecord } from "./notes.types.js";

export class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async list(): Promise<Note[]> {
    return [...this.notes.values()];
  }

  async findById(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async create(record: CreateNoteRecord): Promise<Note> {
    const now = new Date();
    const note: Note = {
      id: randomUUID(),
      title: record.title,
      body: record.body,
      createdAt: now,
      updatedAt: now
    };

    this.notes.set(note.id, note);
    return note;
  }

  async update(id: string, patch: UpdateNoteRecord): Promise<Note | undefined> {
    const current = this.notes.get(id);

    if (!current) {
      return undefined;
    }

    const updated: Note = {
      ...current,
      ...patch,
      updatedAt: new Date()
    };

    this.notes.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  reset(): void {
    this.notes.clear();
  }
}

export const notesRepository = new MemoryNotesRepository();
