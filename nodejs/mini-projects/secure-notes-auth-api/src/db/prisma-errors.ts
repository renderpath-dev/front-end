import { Prisma } from "../generated/prisma/client.js";
import { HttpError } from "../shared/errors/http-error.js";

export function mapPrismaError(error: unknown, conflictCode = "RESOURCE_CONFLICT"): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new HttpError(409, "Resource already exists.", conflictCode);
    }

    if (error.code === "P2025") {
      throw new HttpError(404, "Resource was not found.", "RESOURCE_NOT_FOUND");
    }

    if (error.code === "P2003") {
      throw new HttpError(400, "Related resource does not exist.", "RELATION_NOT_FOUND");
    }
  }

  throw error;
}
