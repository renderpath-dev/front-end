import {
  isValidationFailure,
  parseContactBody,
} from "../utils/serverValidation";

export default defineEventHandler(async (event) => {
  const rawBody: unknown = await readBody(event);

  try {
    const contact = parseContactBody(rawBody);

    return {
      accepted: true,
      email: contact.email,
      messageLength: contact.message.length,
    };
  } catch (error) {
    if (isValidationFailure(error)) {
      throw createError({
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
        message: "Contact payload is invalid.",
      });
    }

    throw error;
  }
});
