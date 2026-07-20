import { mapPrismaError } from "../../db/prisma-errors.js";
import { notebooksRepository } from "./notebooks.repository.js";
import type {
  CreateNotebookInput,
  Notebook,
  NotebookDomainError,
  NotebooksRepository,
  ServiceResult,
  UpdateNotebookInput
} from "./notebooks.types.js";

function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTEBOOK_NOT_FOUND",
      message: `Notebook ${id} was not found`
    }
  };
}

function toNotebookError(error: unknown): NotebookDomainError {
  const databaseError = mapPrismaError(error);

  if (databaseError.code === "UNIQUE_CONSTRAINT") {
    return { code: "NOTEBOOK_NAME_CONFLICT", message: "Notebook name already exists" };
  }

  if (databaseError.code === "MISSING_RECORD") {
    return { code: "NOTEBOOK_NOT_FOUND", message: "Notebook was not found" };
  }

  return { code: "DATABASE_FAILURE", message: "Database operation failed" };
}

export function createNotebooksService(repository: NotebooksRepository) {
  return {
    async listNotebooks(): Promise<ServiceResult<Notebook[]>> {
      try {
        return { ok: true, data: await repository.list() };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async createNotebook(input: CreateNotebookInput): Promise<ServiceResult<Notebook>> {
      try {
        return { ok: true, data: await repository.create(input) };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async getNotebook(id: string): Promise<ServiceResult<Notebook>> {
      try {
        const notebook = await repository.findById(id);
        return notebook ? { ok: true, data: notebook } : notFound(id);
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async updateNotebook(id: string, input: UpdateNotebookInput): Promise<ServiceResult<Notebook>> {
      try {
        return { ok: true, data: await repository.update(id, input) };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async deleteNotebook(id: string): Promise<ServiceResult<{ id: string }>> {
      try {
        const deleted = await repository.delete(id);
        return { ok: true, data: { id: deleted.id } };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    }
  };
}

export const notebooksService = createNotebooksService(notebooksRepository);
