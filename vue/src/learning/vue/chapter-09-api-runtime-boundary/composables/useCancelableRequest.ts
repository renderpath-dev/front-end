import { ref, shallowRef } from "vue";
import type { ApiResult } from "../api/httpTypes";
import type { NormalizedApiError } from "../api/apiErrors";

export function useCancelableRequest<Value>(
  request: (signal: AbortSignal) => Promise<ApiResult<Value>>,
  abortPrevious = true,
) {
  const isCanceled = ref(false);
  const currentRequestId = ref(0);
  const result = shallowRef<ApiResult<Value> | null>(null);
  const error = shallowRef<NormalizedApiError | null>(null);
  let controller: AbortController | null = null;

  async function execute(): Promise<ApiResult<Value>> {
    if (abortPrevious) {
      controller?.abort();
    }

    controller = new AbortController();
    currentRequestId.value += 1;
    isCanceled.value = false;
    error.value = null;
    const response = await request(controller.signal);
    result.value = response;

    if (!response.ok) {
      error.value = response.error;
      isCanceled.value = response.error.kind === "canceled";
    }

    return response;
  }

  function cancel(): void {
    controller?.abort();
  }

  return {
    result,
    error,
    isCanceled,
    currentRequestId,
    execute,
    cancel,
  };
}
