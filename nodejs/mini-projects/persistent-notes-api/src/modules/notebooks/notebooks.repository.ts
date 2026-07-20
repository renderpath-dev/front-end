import { prisma } from "../../db/prisma.js";
import type { Notebook as PrismaNotebook } from "../../generated/prisma/client.js";
import type { CreateNotebookInput, Notebook, NotebooksRepository, UpdateNotebookInput } from "./notebooks.types.js";

function toNotebook(record: PrismaNotebook): Notebook {
  return {
    id: record.id,
    name: record.name,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export class PrismaNotebooksRepository implements NotebooksRepository {
  async list(): Promise<Notebook[]> {
    const notebooks = await prisma.notebook.findMany({
      orderBy: { name: "asc" }
    });

    return notebooks.map(toNotebook);
  }

  async create(input: CreateNotebookInput): Promise<Notebook> {
    const notebook = await prisma.notebook.create({
      data: {
        name: input.name
      }
    });

    return toNotebook(notebook);
  }

  async findById(id: string): Promise<Notebook | undefined> {
    const notebook = await prisma.notebook.findUnique({
      where: { id }
    });

    return notebook ? toNotebook(notebook) : undefined;
  }

  async update(id: string, input: UpdateNotebookInput): Promise<Notebook> {
    const notebook = await prisma.notebook.update({
      where: { id },
      data: input
    });

    return toNotebook(notebook);
  }

  async delete(id: string): Promise<Notebook> {
    const notebook = await prisma.notebook.delete({
      where: { id }
    });

    return toNotebook(notebook);
  }
}

export const notebooksRepository = new PrismaNotebooksRepository();
