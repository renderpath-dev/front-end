import { requireOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { createNotebook, deleteNotebook, findNotebookById, listNotebooks, toNotebookDto, updateNotebook } from "./notebooks.repository.js";
import type { NotebookDto } from "./notebooks.types.js";

export async function listUserNotebooks(ownerId: string): Promise<NotebookDto[]> {
  const notebooks = await listNotebooks(ownerId);
  return notebooks.map(toNotebookDto);
}

export async function getNotebook(ownerId: string, notebookId: string): Promise<NotebookDto> {
  const notebook = await findNotebookById(notebookId);
  if (!notebook) throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  requireOwner(notebook.ownerId, ownerId);
  return toNotebookDto(notebook);
}

export async function createUserNotebook(ownerId: string, input: { name: string }): Promise<NotebookDto> {
  return toNotebookDto(await createNotebook({ ownerId, name: input.name }));
}

export async function updateUserNotebook(ownerId: string, notebookId: string, input: { name: string }): Promise<NotebookDto> {
  await getNotebook(ownerId, notebookId);
  return toNotebookDto(await updateNotebook(notebookId, input));
}

export async function deleteUserNotebook(ownerId: string, notebookId: string): Promise<void> {
  await getNotebook(ownerId, notebookId);
  await deleteNotebook(notebookId);
}
