import type { NoteResponseDto } from "../notes/notes.types.js";

export type Notebook = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NotebookResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookWithNotesResponseDto = NotebookResponseDto & {
  notes: NoteResponseDto[];
};

export type CreateNotebookInput = {
  name: string;
};

export type UpdateNotebookInput = {
  name?: string;
};

export type NotebookIdParams = {
  notebookId: string;
};

export type NotebooksRepository = {
  list(): Promise<Notebook[]>;
  create(input: CreateNotebookInput): Promise<Notebook>;
  findById(id: string): Promise<Notebook | undefined>;
  update(id: string, input: UpdateNotebookInput): Promise<Notebook>;
  delete(id: string): Promise<Notebook>;
};

export type NotebookDomainErrorCode =
  | "NOTEBOOK_NOT_FOUND"
  | "NOTEBOOK_NAME_CONFLICT"
  | "DATABASE_FAILURE";

export type NotebookDomainError = {
  code: NotebookDomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: NotebookDomainError };
