import { prisma } from "../../db/prisma.js";
import type { Note as PrismaNote } from "../../generated/prisma/client.js";
import type { CreateNoteRecord, ListNotesQuery, Note, NoteStatus, NotesRepository, UpdateNoteRecord } from "./notes.types.js";

function toNote(record: PrismaNote): Note {
  return {
    id: record.id,
    notebookId: record.notebookId,
    title: record.title,
    body: record.body,
    status: record.status as NoteStatus,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export class PrismaNotesRepository implements NotesRepository {
  async listByNotebook(notebookId: string, query: ListNotesQuery): Promise<Note[]> {
    const notes = await prisma.note.findMany({
      where: {
        notebookId,
        status: query.status
      },
      orderBy: { createdAt: query.order },
      take: query.take,
      skip: query.skip
    });

    return notes.map(toNote);
  }

  async create(record: CreateNoteRecord): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        notebookId: record.notebookId,
        title: record.title,
        body: record.body ?? "",
        status: record.status ?? "ACTIVE"
      }
    });

    return toNote(note);
  }

  async findById(id: string): Promise<Note | undefined> {
    const note = await prisma.note.findUnique({
      where: { id }
    });

    return note ? toNote(note) : undefined;
  }

  async update(id: string, input: UpdateNoteRecord): Promise<Note> {
    const note = await prisma.note.update({
      where: { id },
      data: input
    });

    return toNote(note);
  }

  async delete(id: string): Promise<Note> {
    const note = await prisma.note.delete({
      where: { id }
    });

    return toNote(note);
  }
}

export const notesRepository = new PrismaNotesRepository();
