import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import * as repository from "./notebooks.repository.js";

export async function list(auth: AuthContext) {
  const notebooks = await repository.listNotebooks(auth.userId);
  return notebooks.map(repository.toNotebookDto);
}

export async function create(auth: AuthContext, input: { name: string }) {
  try {
    const notebook = await repository.createNotebook({ ownerId: auth.userId, name: input.name });
    return repository.toNotebookDto(notebook);
  } catch (error) {
    mapPrismaError(error, "NOTEBOOK_NAME_CONFLICT");
  }
}

export async function get(auth: AuthContext, notebookId: string) {
  const notebook = await getOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(notebook);
}

export async function update(auth: AuthContext, notebookId: string, input: { name: string }) {
  await getOwnedNotebook(auth, notebookId);

  try {
    const notebook = await repository.updateNotebook(notebookId, input);
    return repository.toNotebookDto(notebook);
  } catch (error) {
    mapPrismaError(error, "NOTEBOOK_NAME_CONFLICT");
  }
}

export async function remove(auth: AuthContext, notebookId: string): Promise<void> {
  await getOwnedNotebook(auth, notebookId);
  await repository.deleteNotebook(notebookId);
}

async function getOwnedNotebook(auth: AuthContext, notebookId: string) {
  const notebook = await repository.findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }

  assertOwner(auth, notebook.ownerId);
  return notebook;
}
