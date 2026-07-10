import {
  onMounted,
  onScopeDispose,
  ref,
  watch,
  type Ref,
} from "vue";

export type LocalStorageState<T> = {
  value: Ref<T>;
  storageError: Ref<Error | null>;
  reset: () => void;
};

function toError(cause: unknown): Error {
  return cause instanceof Error
    ? cause
    : new Error("Unknown localStorage error");
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): LocalStorageState<T> {
  const value = ref(initialValue) as Ref<T>;
  const storageError = ref<Error | null>(null);
  let browserReady = false;

  const stopWriting = watch(
    value,
    (nextValue) => {
      if (!browserReady) {
        return;
      }

      try {
        localStorage.setItem(key, JSON.stringify(nextValue));
        storageError.value = null;
      } catch (cause: unknown) {
        storageError.value = toError(cause);
      }
    },
    { deep: true },
  );

  onMounted(() => {
    browserReady = true;

    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        const parsedValue: unknown = JSON.parse(savedValue);
        value.value = parsedValue as T;
      }
      storageError.value = null;
    } catch (cause: unknown) {
      value.value = initialValue;
      storageError.value = toError(cause);
    }
  });

  function reset(): void {
    value.value = initialValue;

    if (browserReady) {
      localStorage.removeItem(key);
    }
  }

  onScopeDispose(stopWriting);

  return {
    value,
    storageError,
    reset,
  };
}
