import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./exports.service.js";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 202, await service.createExport(auth, request.body));
  } catch (error) {
    next(error);
  }
};

export const get: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.getExport(auth, routeParam(request.params.exportId)));
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
