import { Prisma } from "./generated/prisma/client.js";

type PublicDatabaseError =
  | { code: "CONFLICT"; message: string }
  | { code: "NOT_FOUND"; message: string }
  | { code: "INVALID_REFERENCE"; message: string }
  | { code: "DATABASE_FAILURE"; message: string };

export function mapPrismaError(error: unknown): PublicDatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { code: "CONFLICT", message: "Unique constraint was violated" };
    }

    if (error.code === "P2025") {
      return { code: "NOT_FOUND", message: "Record was not found" };
    }

    if (error.code === "P2003") {
      return { code: "INVALID_REFERENCE", message: "Related record was not found" };
    }
  }

  return { code: "DATABASE_FAILURE", message: "Database operation failed" };
}
