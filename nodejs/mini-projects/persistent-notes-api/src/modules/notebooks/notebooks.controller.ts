import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import { notebooksService } from "./notebooks.service.js";
import type {
  CreateNotebookInput,
  Notebook,
  NotebookDomainError,
  NotebookIdParams,
  NotebookResponseDto,
  UpdateNotebookInput
} from "./notebooks.types.js";

function toNotebookResponseDto(notebook: Notebook): NotebookResponseDto {
  return {
    id: notebook.id,
    name: notebook.name,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString()
  };
}

function mapNotebookErrorToHttpError(error: NotebookDomainError): HttpError {
  if (error.code === "NOTEBOOK_NOT_FOUND") {
    return new HttpError(404, error.code, "Notebook was not found");
  }

  if (error.code === "NOTEBOOK_NAME_CONFLICT") {
    return new HttpError(409, error.code, "Notebook name already exists");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected database failure");
}

export const listNotebooks: RequestHandler = async (_request, response) => {
  const result = await notebooksService.listNotebooks();

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNotebookResponseDto));
};

export const createNotebook: RequestHandler = async (_request, response) => {
  const input = getValidated<CreateNotebookInput>(response, "body");
  const result = await notebooksService.createNotebook(input);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNotebookResponseDto(result.data));
};

export const getNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const result = await notebooksService.getNotebook(params.notebookId);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNotebookResponseDto(result.data));
};

export const updateNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const input = getValidated<UpdateNotebookInput>(response, "body");
  const result = await notebooksService.updateNotebook(params.notebookId, input);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNotebookResponseDto(result.data));
};

export const deleteNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const result = await notebooksService.deleteNotebook(params.notebookId);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
