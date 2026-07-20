import type { Attachment } from "../../generated/prisma/client.js";

export type AttachmentRecord = Attachment;

export type AttachmentDto = {
  id: string;
  noteId: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  detectedMimeType: string;
  extension: string;
  byteSize: number;
  sha256: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  downloadUrl: string | null;
};
