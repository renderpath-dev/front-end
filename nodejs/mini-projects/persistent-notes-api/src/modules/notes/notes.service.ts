import { mapPrismaError } from "../../db/prisma-errors.js";
import { notebooksRepository } from "../notebooks/notebooks.repository.js";
import { notesRepository } from "./notes.repository.js";
import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  NoteDomainError,
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

function notebookNotFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTEBOOK_NOT_FOUND",
      message: `Notebook ${id} was not found`
    }
  };
}

function toNoteError(error: unknown): NoteDomainError {
  const databaseError = mapPrismaError(error);

  if (databaseError.code === "UNIQUE_CONSTRAINT") {
    return { code: "NOTE_TITLE_CONFLICT", message: "Note title already exists in this notebook" };
  }

  if (databaseError.code === "MISSING_RECORD") {
    return { code: "NOTE_NOT_FOUND", message: "Note was not found" };
  }

  if (databaseError.code === "RELATION_CONSTRAINT") {
    return { code: "INVALID_REFERENCE", message: "Referenced notebook was not found" };
  }

  return { code: "DATABASE_FAILURE", message: "Database operation failed" };
}

export function createNotesService(repository: NotesRepository) {
  return {
    async listNotebookNotes(notebookId: string, query: ListNotesQuery): Promise<ServiceResult<Note[]>> {
      try {
        const notebook = await notebooksRepository.findById(notebookId);

        if (!notebook) {
          return notebookNotFound(notebookId);
        }

        return { ok: true, data: await repository.listByNotebook(notebookId, query) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async createNotebookNote(notebookId: string, input: CreateNoteInput): Promise<ServiceResult<Note>> {
      try {
        return { ok: true, data: await repository.create({ notebookId, ...input }) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async getNote(id: string): Promise<ServiceResult<Note>> {
      try {
        const note = await repository.findById(id);
        return note ? { ok: true, data: note } : notFound(id);
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async updateNote(id: string, input: UpdateNoteInput): Promise<ServiceResult<Note>> {
      try {
        return { ok: true, data: await repository.update(id, input) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async deleteNote(id: string): Promise<ServiceResult<{ id: string }>> {
      try {
        const deleted = await repository.delete(id);
        return { ok: true, data: { id: deleted.id } };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    }
  };
}

export const notesService = createNotesService(notesRepository);
