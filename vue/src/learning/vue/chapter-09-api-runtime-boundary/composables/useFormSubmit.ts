import { computed, ref, shallowRef } from "vue";
import type { z } from "zod";
import { normalizeValidationError } from "../api/apiErrors";
import type { NormalizedApiError } from "../api/apiErrors";
import type { ApiResult } from "../api/httpTypes";

export function useFormSubmit<Payload, Result>(
  schema: z.ZodType<Payload>,
  submitRequest: (payload: Payload) => Promise<ApiResult<Result>>,
) {
  const status = ref<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const data = shallowRef<Result | null>(null);
  const error = shallowRef<NormalizedApiError | null>(null);

  const isSubmitting = computed(() => status.value === "submitting");

  async function submit(candidate: unknown): Promise<void> {
    status.value = "submitting";
    error.value = null;
    const validation = schema.safeParse(candidate);

    if (!validation.success) {
      error.value = normalizeValidationError(
        validation.error,
        "validation",
      );
      status.value = "error";
      return;
    }

    const result = await submitRequest(validation.data);
    if (result.ok) {
      data.value = result.data;
      status.value = "success";
    } else {
      error.value = result.error;
      status.value = "error";
    }
  }

  function reset(): void {
    status.value = "idle";
    data.value = null;
    error.value = null;
  }

  return {
    status,
    data,
    error,
    isSubmitting,
    submit,
    reset,
  };
}
