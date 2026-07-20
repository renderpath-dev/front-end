import { Prisma } from "../generated/prisma/client.js";

export function isPrismaKnownRequestError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export function isUniqueConstraintError(error: unknown): boolean {
  return isPrismaKnownRequestError(error) && error.code === "P2002";
}
