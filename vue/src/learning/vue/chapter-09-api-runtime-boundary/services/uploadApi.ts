import { z } from "zod";
import { requestValidated } from "../api/httpClient";
import type { ApiCallOptions, ApiResult } from "../api/httpTypes";
import { createApiMutationEnvelopeSchema } from "../validators/apiEnvelopeValidator";

export type UploadPayload = {
  fileName: string;
  size: number;
  type: string;
};

export type UploadReceipt = {
  uploadId: string;
  accepted: boolean;
};

const uploadResponseSchema = createApiMutationEnvelopeSchema(
  z
    .object({
      uploadId: z.string().min(1),
      accepted: z.boolean(),
    })
    .strict(),
);

export async function submitUpload(
  payload: UploadPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<UploadReceipt>> {
  const result = await requestValidated(uploadResponseSchema, {
    method: "POST",
    url: "/uploads",
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "uploads:create" },
  });
  if (!result.ok) return result;

  const data = result.data.data;
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
