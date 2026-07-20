import { Router } from "express";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./attachments.controller.js";
import { attachmentParamsSchema, noteAttachmentParamsSchema } from "./attachments.schema.js";

export const noteAttachmentsRoutes = Router({ mergeParams: true });
export const attachmentRoutes = Router();

noteAttachmentsRoutes.post("/", requireCsrfToken, validateRequest({ params: noteAttachmentParamsSchema }), controller.upload);
noteAttachmentsRoutes.get("/", validateRequest({ params: noteAttachmentParamsSchema }), controller.listForNote);

attachmentRoutes.get("/:attachmentId", validateRequest({ params: attachmentParamsSchema }), controller.getById);
attachmentRoutes.get("/:attachmentId/download", validateRequest({ params: attachmentParamsSchema }), controller.download);
attachmentRoutes.delete("/:attachmentId", requireCsrfToken, validateRequest({ params: attachmentParamsSchema }), controller.removeById);
