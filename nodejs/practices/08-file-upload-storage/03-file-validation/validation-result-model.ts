import { z } from "zod";

const uploadValidationSchema = z.object({
  originalName: z.string().min(1),
  extension: z.enum([".png", ".jpg", ".jpeg", ".pdf"]),
  declaredMimeType: z.string().min(1),
  detectedMimeType: z.enum(["image/png", "image/jpeg", "application/pdf"]),
  byteSize: z.number().int().positive(),
  sha256: z.string().regex(/^[a-f0-9]{64}$/)
});

console.log(uploadValidationSchema.safeParse({
  originalName: "avatar.png",
  extension: ".png",
  declaredMimeType: "image/png",
  detectedMimeType: "image/png",
  byteSize: 128,
  sha256: "a".repeat(64)
}).success);
