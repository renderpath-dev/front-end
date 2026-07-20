import { z } from "zod";

const createNoteSchema = z.object({
  title: z.string().trim().min(1),
  body: z.string().trim().optional()
});

type CreateNoteInput = z.infer<typeof createNoteSchema>;

function unsafeReadTitle(rawBody: unknown): string {
  const body = rawBody as CreateNoteInput;
  return body.title.trim();
}

function validateCreateNote(rawBody: unknown): CreateNoteInput {
  const result = createNoteSchema.safeParse(rawBody);

  if (!result.success) {
    throw new Error("Invalid request body");
  }

  return result.data;
}

const validBody: unknown = { title: "Learning Node", body: "Typed input boundary" };
const invalidBody: unknown = { title: "" };

console.log({ unsafeTitle: unsafeReadTitle(validBody) });
console.log({ safeInput: validateCreateNote(validBody) });

try {
  validateCreateNote(invalidBody);
} catch (error) {
  console.log({ validationError: error instanceof Error ? error.message : "Unknown error" });
}
