import { randomUUID } from "node:crypto";
import type {
  CreateNoteInput,
  UpdateNoteInput
} from "./notes.schema.js";
import type { Note } from "./notes.types.js";

class NotesRepository {
  readonly #notes = new Map<string, Note>();

  async list(): Promise<Note[]> {
    return [...this.#notes.values()];
  }

  async findById(id: string): Promise<Note | null> {
    return this.#notes.get(id) ?? null;
  }

  async create(input: CreateNoteInput): Promise<Note> {
    const timestamp = new Date().toISOString();
    const note: Note = {
      id: randomUUID(),
      title: input.title,
      content: input.content,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.#notes.set(note.id, note);
    return note;
  }

  async update(id: string, input: UpdateNoteInput): Promise<Note | null> {
    const current = this.#notes.get(id);

    if (!current) {
      return null;
    }

    const updated: Note = {
      ...current,
      ...input,
      updatedAt: new Date().toISOString()
    };

    this.#notes.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.#notes.delete(id);
  }

  reset(): void {
    this.#notes.clear();
  }
}

export const notesRepository = new NotesRepository();
