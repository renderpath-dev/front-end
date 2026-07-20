export type NoteStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type NoteDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type NoteRecord = {
  id: string;
  ownerId: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
};
