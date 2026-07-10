import { toValue, type MaybeRefOrGetter } from "vue";
import { useEventListener } from "./useEventListener";

export function useClickOutside(
  target: MaybeRefOrGetter<HTMLElement | null>,
  callback: (event: PointerEvent) => void,
): void {
  useEventListener(
    () => (typeof document === "undefined" ? null : document),
    "pointerdown",
    (event) => {
      const element = toValue(target);

      if (
        element &&
        event instanceof PointerEvent &&
        event.target instanceof Node &&
        !element.contains(event.target)
      ) {
        callback(event);
      }
    },
  );
}
