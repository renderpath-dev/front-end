import { z } from "zod";

const cachedNotebookSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const recordFromDatabase = {
  id: "notebook_1",
  name: "Work",
  createdAt: new Date("2026-07-19T00:00:00.000Z"),
  updatedAt: new Date("2026-07-19T00:00:00.000Z")
};

const cachedValue = JSON.stringify({
  ...recordFromDatabase,
  createdAt: recordFromDatabase.createdAt.toISOString(),
  updatedAt: recordFromDatabase.updatedAt.toISOString()
});

const parsed = cachedNotebookSchema.parse(JSON.parse(cachedValue));
console.log(parsed);
