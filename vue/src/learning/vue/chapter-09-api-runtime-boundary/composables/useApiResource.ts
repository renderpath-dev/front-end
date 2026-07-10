import { computed, ref, shallowRef } from "vue";
import type { ApiResult } from "../api/httpTypes";
import type { NormalizedApiError } from "../api/apiErrors";

export type ApiResourceStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export function useApiResource<Value>(
  request: () => Promise<ApiResult<Value>>,
) {
  const data = shallowRef<Value | null>(null);
  const error = shallowRef<NormalizedApiError | null>(null);
  const status = ref<ApiResourceStatus>("idle");
  let executionSequence = 0;

  const isLoading = computed(() => status.value === "loading");
  const isSuccess = computed(() => status.value === "success");
  const isError = computed(() => status.value === "error");

  async function execute(): Promise<ApiResult<Value>> {
    executionSequence += 1;
    const currentSequence = executionSequence;
    status.value = "loading";
    error.value = null;

    const result = await request();
    if (currentSequence !== executionSequence) {
      return result;
    }

    if (result.ok) {
      data.value = result.data;
      status.value = "success";
    } else {
      error.value = result.error;
      status.value = "error";
    }

    return result;
  }

  function reset(): void {
    executionSequence += 1;
    data.value = null;
    error.value = null;
    status.value = "idle";
  }

  return {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset,
  };
}
