import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notebooks.service.js";

export const list: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.list(auth));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 201, await service.create(auth, request.body));
  } catch (error) {
    next(error);
  }
};

export const get: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.get(auth, routeParam(request.params.notebookId)));
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.update(auth, routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await service.remove(auth, routeParam(request.params.notebookId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
