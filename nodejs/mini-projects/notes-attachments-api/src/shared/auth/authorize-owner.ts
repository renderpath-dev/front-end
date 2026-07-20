import type { AuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function authorizeOwner(auth: AuthContext, ownerId: string): void {
  if (auth.userId !== ownerId) {
    throw new HttpError(403, "The resource does not belong to the authenticated user.", "OWNER_REQUIRED");
  }
}
