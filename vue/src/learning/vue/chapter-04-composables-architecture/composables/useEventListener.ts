import { onMounted, onScopeDispose } from "vue";

export type EventTargetGetter = () => EventTarget | null;

export type EventListenerState = {
  start: () => void;
  stop: () => void;
};

export function useEventListener(
  target: EventTargetGetter,
  eventName: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): EventListenerState {
  let activeTarget: EventTarget | null = null;

  function stop(): void {
    activeTarget?.removeEventListener(eventName, listener, options);
    activeTarget = null;
  }

  function start(): void {
    stop();
    activeTarget = target();
    activeTarget?.addEventListener(eventName, listener, options);
  }

  onMounted(start);
  onScopeDispose(stop);

  return {
    start,
    stop,
  };
}
