export type NoteStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type Note = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteResponseDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = {
  title: string;
  body?: string;
  status?: NoteStatus;
};

export type UpdateNoteInput = {
  title?: string;
  body?: string;
  status?: NoteStatus;
};

export type NoteIdParams = {
  noteId: string;
};

export type ListNotesQuery = {
  status?: NoteStatus;
  take: number;
  skip: number;
  order: "asc" | "desc";
};

export type CreateNoteRecord = CreateNoteInput & {
  notebookId: string;
};

export type UpdateNoteRecord = UpdateNoteInput;

export type NotesRepository = {
  listByNotebook(notebookId: string, query: ListNotesQuery): Promise<Note[]>;
  create(record: CreateNoteRecord): Promise<Note>;
  findById(id: string): Promise<Note | undefined>;
  update(id: string, input: UpdateNoteRecord): Promise<Note>;
  delete(id: string): Promise<Note>;
};

export type NoteDomainErrorCode =
  | "NOTEBOOK_NOT_FOUND"
  | "NOTE_NOT_FOUND"
  | "NOTE_TITLE_CONFLICT"
  | "INVALID_REFERENCE"
  | "DATABASE_FAILURE";

export type NoteDomainError = {
  code: NoteDomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: NoteDomainError };
