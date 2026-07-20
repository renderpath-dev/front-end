import { AttachmentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../db/prisma.js";
import type { AttachmentDto, AttachmentRecord } from "./attachments.types.js";

export function toAttachmentDto(attachment: AttachmentRecord): AttachmentDto {
  return {
    id: attachment.id,
    noteId: attachment.noteId,
    originalName: attachment.originalName,
    storedName: attachment.storedName,
    mimeType: attachment.mimeType,
    detectedMimeType: attachment.detectedMimeType,
    extension: attachment.extension,
    byteSize: Number(attachment.byteSize),
    sha256: attachment.sha256,
    status: attachment.status,
    createdAt: attachment.createdAt.toISOString(),
    updatedAt: attachment.updatedAt.toISOString(),
    deletedAt: attachment.deletedAt?.toISOString() ?? null,
    downloadUrl: attachment.status === AttachmentStatus.READY ? `/attachments/${attachment.id}/download` : null
  };
}

export async function createAttachmentMetadata(input: {
  ownerId: string;
  noteId: string;
  originalName: string;
  storedName: string;
  storageKey: string;
  mimeType: string;
  detectedMimeType: string;
  extension: string;
  byteSize: number;
  sha256: string;
}): Promise<AttachmentRecord> {
  return prisma.attachment.create({
    data: {
      ...input,
      byteSize: BigInt(input.byteSize)
    }
  });
}

export async function listReadyAttachments(input: { ownerId: string; noteId: string }): Promise<AttachmentRecord[]> {
  return prisma.attachment.findMany({
    where: {
      ownerId: input.ownerId,
      noteId: input.noteId,
      status: AttachmentStatus.READY
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function findAttachmentById(id: string): Promise<AttachmentRecord | null> {
  return prisma.attachment.findUnique({ where: { id } });
}

export async function softDeleteAttachment(id: string): Promise<AttachmentRecord> {
  return prisma.attachment.update({
    where: { id },
    data: {
      status: AttachmentStatus.DELETED,
      deletedAt: new Date()
    }
  });
}
