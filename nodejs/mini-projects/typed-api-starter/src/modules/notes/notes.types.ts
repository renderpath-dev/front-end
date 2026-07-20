import type { z } from "zod";
import type { createNoteSchema, noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StoredNote = {
  id: string;
  title: string;
  body: string;
  createdAtIso: string;
  updatedAtIso: string;
};

export type NoteResponseDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;

export type CreateNoteRecord = {
  title: string;
  body: string;
};

export type UpdateNoteRecord = {
  title?: string;
  body?: string;
};

export type NotesRepository = {
  list(): Promise<Note[]>;
  findById(id: string): Promise<Note | undefined>;
  create(record: CreateNoteRecord): Promise<Note>;
  update(id: string, patch: UpdateNoteRecord): Promise<Note | undefined>;
  delete(id: string): Promise<boolean>;
  reset(): void;
};

export type DomainErrorCode = "NOTE_NOT_FOUND";

export type DomainError = {
  code: DomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: DomainError };
