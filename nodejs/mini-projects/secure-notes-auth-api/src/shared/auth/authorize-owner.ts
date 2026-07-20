import type { AuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function assertOwner(auth: AuthContext, ownerId: string): void {
  if (auth.userId !== ownerId) {
    throw new HttpError(403, "You do not own this resource.", "FORBIDDEN_OWNER");
  }
}
