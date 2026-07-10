import { z } from "zod";
import {
  createApiListEnvelopeSchema,
  createApiMutationEnvelopeSchema,
} from "./apiEnvelopeValidator";

export const userDtoSchema = z
  .object({
    id: z.string().min(1),
    display_name: z.string().min(1),
    email_address: z.string().email(),
    role: z.enum(["admin", "manager", "operator"]),
    status: z.enum(["active", "suspended"]),
  })
  .strict();

export const createUserPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email(),
    role: z.enum(["admin", "manager", "operator"]),
  })
  .strict();

export const userListResponseSchema =
  createApiListEnvelopeSchema(userDtoSchema);

export const userMutationResponseSchema =
  createApiMutationEnvelopeSchema(userDtoSchema);
