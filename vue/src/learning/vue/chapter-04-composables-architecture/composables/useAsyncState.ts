import {
  computed,
  ref,
  type ComputedRef,
  type Ref,
} from "vue";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  status: Ref<AsyncStatus>;
  loading: ComputedRef<boolean>;
  execute: () => Promise<T | null>;
  reset: () => void;
};

function toError(cause: unknown): Error {
  return cause instanceof Error
    ? cause
    : new Error("Unknown asynchronous operation error");
}

export function useAsyncState<T>(
  operation: () => Promise<T>,
  initialData: T | null = null,
): AsyncState<T> {
  const data = ref(initialData) as Ref<T | null>;
  const error = ref<Error | null>(null);
  const status = ref<AsyncStatus>("idle");
  const loading = computed(() => status.value === "loading");
  let latestRequestId = 0;

  async function execute(): Promise<T | null> {
    const requestId = latestRequestId + 1;
    latestRequestId = requestId;
    status.value = "loading";
    error.value = null;

    try {
      const result = await operation();

      if (requestId !== latestRequestId) {
        return null;
      }

      data.value = result;
      status.value = "success";
      return result;
    } catch (cause: unknown) {
      if (requestId !== latestRequestId) {
        return null;
      }

      error.value = toError(cause);
      status.value = "error";
      return null;
    }
  }

  function reset(): void {
    latestRequestId += 1;
    data.value = initialData;
    error.value = null;
    status.value = "idle";
  }

  return {
    data,
    error,
    status,
    loading,
    execute,
    reset,
  };
}
