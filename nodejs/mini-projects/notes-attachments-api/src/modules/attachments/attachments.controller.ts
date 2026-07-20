import { pipeline } from "node:stream/promises";
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./attachments.service.js";

export const upload: RequestHandler = async (request, response, next) => {
  try {
    const attachment = await service.upload(requireAuthContext(response), routeParam(request.params.noteId), request);
    sendResponse(response, 201, attachment);
  } catch (error) {
    next(error);
  }
};

export const listForNote: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.listForNote(requireAuthContext(response), routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.attachmentId)));
  } catch (error) {
    next(error);
  }
};

export const download: RequestHandler = async (request, response, next) => {
  try {
    const result = await service.openDownload(requireAuthContext(response), routeParam(request.params.attachmentId));
    response.set(result.headers);
    await pipeline(result.stream, response);
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.attachmentId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
