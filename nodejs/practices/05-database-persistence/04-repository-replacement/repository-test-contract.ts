import assert from "node:assert/strict";
import type { NotesRepository } from "./repository-contract.js";

export async function assertNotesRepositoryContract(repository: NotesRepository): Promise<void> {
  const created = await repository.create({
    notebookId: "notebook_1",
    title: "Contract test",
    body: "The same behavior can run against memory or Prisma."
  });

  const found = await repository.findById(created.id);
  const listed = await repository.listByNotebook("notebook_1");
  const deleted = await repository.delete(created.id);

  assert.equal(found?.id, created.id);
  assert.equal(listed.length, 1);
  assert.equal(deleted, true);
}
