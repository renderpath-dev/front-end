import type { Request } from "express";
import type { Readable } from "node:stream";
import { HttpError } from "../../shared/errors/http-error.js";
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { objectStore } from "../../storage/local-object-store.js";
import { createStorageKey, storedNameFromStorageKey } from "../../storage/storage-key.js";
import { removeTempFile } from "../../storage/temp-files.js";
import { parseMultipartUpload } from "../../uploads/multipart-parser.js";
import { validateUploadedFile } from "../../uploads/file-validation.js";
import { contentDispositionAttachment } from "../../uploads/filename.js";
import * as notesService from "../notes/notes.service.js";
import * as repository from "./attachments.repository.js";
import type { AttachmentDto } from "./attachments.types.js";

export async function upload(auth: AuthContext, noteId: string, request: Request): Promise<AttachmentDto> {
  await notesService.requireOwnedNote(auth, noteId);
  const parsed = await parseMultipartUpload(request);
  let storageKey: string | undefined;

  try {
    const validatedFile = await validateUploadedFile(parsed.file);
    storageKey = createStorageKey({
      ownerId: auth.userId,
      noteId,
      extension: validatedFile.extension
    });

    const storedObject = await objectStore.putFile({
      sourcePath: validatedFile.tempPath,
      storageKey
    });

    const attachment = await repository.createAttachmentMetadata({
      ownerId: auth.userId,
      noteId,
      originalName: validatedFile.originalName,
      storedName: storedNameFromStorageKey(storageKey),
      storageKey,
      mimeType: validatedFile.declaredMimeType,
      detectedMimeType: validatedFile.detectedMimeType,
      extension: validatedFile.extension,
      byteSize: storedObject.byteSize,
      sha256: validatedFile.sha256
    });

    return repository.toAttachmentDto(attachment);
  } catch (error) {
    if (storageKey) {
      await objectStore.deleteFile(storageKey);
    }
    throw error;
  } finally {
    await removeTempFile(parsed.file.tempPath);
  }
}

export async function listForNote(auth: AuthContext, noteId: string): Promise<AttachmentDto[]> {
  await notesService.requireOwnedNote(auth, noteId);
  const attachments = await repository.listReadyAttachments({
    ownerId: auth.userId,
    noteId
  });
  return attachments.map(repository.toAttachmentDto);
}

export async function getById(auth: AuthContext, attachmentId: string): Promise<AttachmentDto> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  return repository.toAttachmentDto(attachment);
}

export async function openDownload(auth: AuthContext, attachmentId: string): Promise<{
  stream: Readable;
  headers: Record<string, string>;
}> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  const stat = await objectStore.stat(attachment.storageKey);
  const stream = objectStore.createReadStream(attachment.storageKey);

  return {
    stream,
    headers: {
      "Content-Type": attachment.detectedMimeType,
      "Content-Length": String(stat.byteSize),
      "Content-Disposition": contentDispositionAttachment(attachment.originalName),
      "ETag": `"sha256-${attachment.sha256}"`,
      "X-Content-Type-Options": "nosniff"
    }
  };
}

export async function removeById(auth: AuthContext, attachmentId: string): Promise<void> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  await repository.softDeleteAttachment(attachment.id);
  await objectStore.deleteFile(attachment.storageKey);
}

async function requireReadyAttachment(auth: AuthContext, attachmentId: string) {
  const attachment = await repository.findAttachmentById(attachmentId);
  if (!attachment || attachment.status !== "READY") {
    throw new HttpError(404, "Attachment was not found.", "ATTACHMENT_NOT_FOUND");
  }

  authorizeOwner(auth, attachment.ownerId);
  return attachment;
}
