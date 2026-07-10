import { ref, type Ref } from "vue";

export type CounterState = {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export function useCounter(initialValue = 0): CounterState {
  const count = ref(initialValue);

  function increment(): void {
    count.value += 1;
  }

  function decrement(): void {
    count.value -= 1;
  }

  function reset(): void {
    count.value = initialValue;
  }

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
