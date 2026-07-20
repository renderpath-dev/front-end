type Operation =
  | "list"
  | "create"
  | "replace"
  | "delete"
  | "malformed-request"
  | "invalid-input"
  | "unauthenticated"
  | "forbidden"
  | "not-found"
  | "conflict"
  | "unexpected-error";

const statusByOperation: Record<Operation, number> = {
  list: 200,
  create: 201,
  replace: 200,
  delete: 204,
  "malformed-request": 400,
  "invalid-input": 422,
  unauthenticated: 401,
  forbidden: 403,
  "not-found": 404,
  conflict: 409,
  "unexpected-error": 500
};

for (const [operation, statusCode] of Object.entries(statusByOperation)) {
  console.log(`${operation}: ${statusCode}`);
}
