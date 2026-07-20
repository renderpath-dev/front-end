import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import * as repository from "./notebooks.repository.js";
import type { NotebookDto } from "./notebooks.types.js";

export async function list(auth: AuthContext): Promise<NotebookDto[]> {
  const notebooks = await repository.listNotebooks(auth.userId);
  return notebooks.map(repository.toNotebookDto);
}

export async function create(auth: AuthContext, input: { name: string }): Promise<NotebookDto> {
  return repository.toNotebookDto(await repository.createNotebook({ ownerId: auth.userId, name: input.name }));
}

export async function getById(auth: AuthContext, notebookId: string): Promise<NotebookDto> {
  const notebook = await requireOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(notebook);
}

export async function updateById(auth: AuthContext, notebookId: string, input: { name: string }): Promise<NotebookDto> {
  await requireOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(await repository.updateNotebook(notebookId, input));
}

export async function removeById(auth: AuthContext, notebookId: string): Promise<void> {
  await requireOwnedNotebook(auth, notebookId);
  await repository.deleteNotebook(notebookId);
}

export async function requireOwnedNotebook(auth: AuthContext, notebookId: string) {
  const notebook = await repository.findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }
  authorizeOwner(auth, notebook.ownerId);
  return notebook;
}
