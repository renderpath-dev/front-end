import { z } from "zod";
import { requestValidated } from "../api/httpClient";
import type { ApiCallOptions, ApiResult } from "../api/httpTypes";
import { createApiSuccessEnvelopeSchema } from "../validators/apiEnvelopeValidator";

export type SessionInfo = {
  role: string;
  authenticated: boolean;
};

const sessionResponseSchema = createApiSuccessEnvelopeSchema(
  z
    .object({
      role: z.string().min(1),
      authenticated: z.boolean(),
    })
    .strict(),
);

export async function readSession(
  options: ApiCallOptions = {},
): Promise<ApiResult<SessionInfo>> {
  const result = await requestValidated(sessionResponseSchema, {
    method: "GET",
    url: "/session",
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "auth:session" },
  });
  if (!result.ok) return result;

  const data = result.data.data;
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
