import { z } from "zod";

const patchNoteSchema = z.object({
  title: z.string().trim().min(1).optional(),
  body: z.string().trim().optional()
}).refine((value) => value.title !== undefined || value.body !== undefined, {
  message: "At least one field is required"
});

type PatchNoteInput = z.infer<typeof patchNoteSchema>;

function describePatchInput(rawInput: unknown): string {
  const result = patchNoteSchema.safeParse(rawInput);

  if (!result.success) {
    return `invalid:${result.error.issues[0]?.message ?? "Unknown validation error"}`;
  }

  const patchInput: PatchNoteInput = result.data;
  return `valid:title=${patchInput.title ?? "unchanged"} body=${patchInput.body ?? "unchanged"}`;
}

console.log(describePatchInput({ title: "Updated" }));
console.log(describePatchInput({}));
