import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notebooks.service.js";

export const list: RequestHandler = async (_request, response, next) => {
  try {
    sendResponse(response, 200, await service.list(requireAuthContext(response)));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 201, await service.create(requireAuthContext(response), request.body));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.notebookId)));
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.updateById(requireAuthContext(response), routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.notebookId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
