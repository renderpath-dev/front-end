import { notesRepository } from "./notes.repository.js";
import type {
  CreateNoteInput,
  Note,
  NotesRepository,
  ServiceResult,
  UpdateNoteInput
} from "./notes.types.js";

function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTE_NOT_FOUND",
      message: `Note ${id} was not found`
    }
  };
}

export function createNotesService(repository: NotesRepository) {
  return {
    async listNotes(): Promise<ServiceResult<Note[]>> {
      return { ok: true, data: await repository.list() };
    },

    async createNote(input: CreateNoteInput): Promise<ServiceResult<Note>> {
      const note = await repository.create({
        title: input.title,
        body: input.body ?? ""
      });

      return { ok: true, data: note };
    },

    async getNote(id: string): Promise<ServiceResult<Note>> {
      const note = await repository.findById(id);
      return note ? { ok: true, data: note } : notFound(id);
    },

    async updateNote(id: string, input: UpdateNoteInput): Promise<ServiceResult<Note>> {
      const note = await repository.update(id, input);
      return note ? { ok: true, data: note } : notFound(id);
    },

    async deleteNote(id: string): Promise<ServiceResult<{ id: string }>> {
      const deleted = await repository.delete(id);
      return deleted ? { ok: true, data: { id } } : notFound(id);
    }
  };
}

export const notesService = createNotesService(notesRepository);
