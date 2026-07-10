import {
  customRef,
  getCurrentScope,
  onScopeDispose,
  type Ref,
} from "vue";

export function useDebouncedRef<T>(
  initialValue: T,
  delay = 300,
): Ref<T> {
  let currentValue = initialValue;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedRef = customRef<T>((track, trigger) => ({
    get() {
      track();
      return currentValue;
    },
    set(nextValue) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        currentValue = nextValue;
        timeoutId = undefined;
        trigger();
      }, Math.max(0, delay));
    },
  }));

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearTimeout(timeoutId);
    });
  }

  return debouncedRef;
}
