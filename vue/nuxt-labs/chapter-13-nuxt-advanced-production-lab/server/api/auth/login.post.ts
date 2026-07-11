import { findDemoUser } from "../../utils/mockUsers";
import { createSessionPayload } from "../../utils/sessionPolicy";
import {
  isValidationFailure,
  parseLoginBody,
} from "../../utils/serverValidation";
import type { LoginResponse } from "../../../shared/types/auth";

export default defineEventHandler(async (event) => {
  const rawBody: unknown = await readBody(event);

  try {
    const credentials = parseLoginBody(rawBody);
    const user = findDemoUser(credentials.email, credentials.password);

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Invalid credentials.",
      });
    }

    await setUserSession(event, createSessionPayload(user));

    return {
      user,
    } satisfies LoginResponse;
  } catch (error) {
    if (isValidationFailure(error)) {
      throw createError({
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
        message: "Login payload is invalid.",
      });
    }

    throw error;
  }
});
