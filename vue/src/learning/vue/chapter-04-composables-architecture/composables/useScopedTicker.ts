import {
  effectScope,
  getCurrentScope,
  onScopeDispose,
  ref,
  watchEffect,
  type EffectScope,
  type Ref,
} from "vue";

export type ScopedTickerState = {
  ticks: Ref<number>;
  observedTick: Ref<number>;
  running: Ref<boolean>;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

export function useScopedTicker(intervalMs = 500): ScopedTickerState {
  const ticks = ref(0);
  const observedTick = ref(0);
  const running = ref(false);
  let tickerScope: EffectScope | null = null;

  function stop(): void {
    tickerScope?.stop();
    tickerScope = null;
    running.value = false;
  }

  function start(): void {
    if (tickerScope?.active) {
      return;
    }

    tickerScope = effectScope();
    tickerScope.run(() => {
      const intervalId = setInterval(() => {
        ticks.value += 1;
      }, Math.max(50, intervalMs));

      watchEffect(() => {
        observedTick.value = ticks.value;
      });

      onScopeDispose(() => {
        clearInterval(intervalId);
      });
    });
    running.value = true;
  }

  function reset(): void {
    ticks.value = 0;
  }

  if (getCurrentScope()) {
    onScopeDispose(stop);
  }

  return {
    ticks,
    observedTick,
    running,
    start,
    stop,
    reset,
  };
}
