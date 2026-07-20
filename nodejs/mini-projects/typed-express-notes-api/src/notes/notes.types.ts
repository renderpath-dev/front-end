export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ErrorDetail = {
  path: string;
  message: string;
};

export type SuccessResponse<T> = {
  ok: true;
  data: T;
};

export type ErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    details: unknown;
  };
};
