import { Prisma } from "../generated/prisma/client.js";

export type DatabaseErrorCode =
  | "UNIQUE_CONSTRAINT"
  | "MISSING_RECORD"
  | "RELATION_CONSTRAINT"
  | "DATABASE_FAILURE";

export type DatabaseError = {
  code: DatabaseErrorCode;
};

export function mapPrismaError(error: unknown): DatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { code: "UNIQUE_CONSTRAINT" };
    }

    if (error.code === "P2025") {
      return { code: "MISSING_RECORD" };
    }

    if (error.code === "P2003") {
      return { code: "RELATION_CONSTRAINT" };
    }
  }

  return { code: "DATABASE_FAILURE" };
}
