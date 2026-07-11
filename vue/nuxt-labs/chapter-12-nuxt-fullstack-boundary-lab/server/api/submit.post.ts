import { fail, ok } from "../utils/serverResponse";
import { parseSubmitRequest } from "../utils/validateRequest";

export default defineEventHandler(async (event) => {
  const body: unknown = await readBody(event);
  const result = parseSubmitRequest(body);

  if (!result.valid || !result.value) {
    setResponseStatus(event, 422);

    return fail(
      "validation_error",
      result.message ?? "Request body is invalid.",
    );
  }

  return ok({
    accepted: true,
    productId: result.value.productId,
    email: result.value.email,
  });
});
