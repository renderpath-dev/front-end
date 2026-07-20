import type { PrismaClient } from "../03-prisma-basics/generated/prisma/client.js";
import type { CreateNoteRecord, Note, NotesRepository } from "./repository-contract.js";

function toDomainNote(record: {
  id: string;
  notebookId: string;
  title: string;
  body: string;
}): Note {
  return {
    id: record.id,
    notebookId: record.notebookId,
    title: record.title,
    body: record.body
  };
}

export class PrismaNotesRepository implements NotesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(record: CreateNoteRecord): Promise<Note> {
    const created = await this.prisma.note.create({
      data: record
    });

    return toDomainNote(created);
  }

  async findById(id: string): Promise<Note | undefined> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    return note ? toDomainNote(note) : undefined;
  }

  async listByNotebook(notebookId: string): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: { notebookId },
      orderBy: { createdAt: "desc" }
    });

    return notes.map(toDomainNote);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.note.deleteMany({ where: { id } });
    return result.count === 1;
  }
}
