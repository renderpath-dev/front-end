import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notes.service.js";

export const list: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.list(auth, {
      notebookId: routeParam(request.params.notebookId),
      status: request.query.status as never,
      limit: Number(request.query.limit),
      offset: Number(request.query.offset)
    }));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 201, await service.create(auth, routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.getById(auth, routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.updateById(auth, routeParam(request.params.noteId), request.body));
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await service.removeById(auth, routeParam(request.params.noteId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
