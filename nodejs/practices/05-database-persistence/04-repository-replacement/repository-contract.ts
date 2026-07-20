export type Note = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
};

export type CreateNoteRecord = {
  notebookId: string;
  title: string;
  body: string;
};

export type NotesRepository = {
  create(record: CreateNoteRecord): Promise<Note>;
  findById(id: string): Promise<Note | undefined>;
  listByNotebook(notebookId: string): Promise<Note[]>;
  delete(id: string): Promise<boolean>;
};
