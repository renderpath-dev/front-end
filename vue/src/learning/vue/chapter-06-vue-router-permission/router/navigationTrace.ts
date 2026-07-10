import { readonly, ref } from "vue";

export type NavigationTracePhase =
  | "beforeEach"
  | "beforeResolve"
  | "afterEach";

export type NavigationTraceEntry = {
  id: number;
  phase: NavigationTracePhase;
  from: string;
  to: string;
  outcome: string;
};

const traceState = ref<Array<NavigationTraceEntry>>([]);
let nextTraceId = 1;

export const navigationTrace = readonly(traceState);

export function recordNavigationTrace(
  entry: Omit<NavigationTraceEntry, "id">,
): void {
  traceState.value = [
    {
      id: nextTraceId,
      ...entry,
    },
    ...traceState.value,
  ].slice(0, 12);

  nextTraceId += 1;
}

export function clearNavigationTrace(): void {
  traceState.value = [];
}
