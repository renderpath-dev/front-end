import { ref, shallowRef } from "vue";
import type { ApiResult, HttpMethod } from "../api/httpTypes";
import type { ApiRetryConfig } from "../api/httpTypes";
import {
  defaultRetryConfig,
  getRetryDelay,
  shouldRetryRequest,
} from "../api/retryPolicy";
import { recordTimelineEvent } from "../api/mockBackendScenarios";

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export function useRetryableRequest<Value>(
  method: HttpMethod,
  request: (attempt: number) => Promise<ApiResult<Value>>,
  config: ApiRetryConfig = defaultRetryConfig,
) {
  const attemptCount = ref(0);
  const timeline = ref<Array<string>>([]);
  const result = shallowRef<ApiResult<Value> | null>(null);

  async function execute(): Promise<ApiResult<Value>> {
    attemptCount.value = 0;
    timeline.value = [];

    while (attemptCount.value < config.maxAttempts) {
      attemptCount.value += 1;
      const attempt = attemptCount.value;
      timeline.value = [...timeline.value, `Attempt ${attempt} started`];
      const current = await request(attempt);

      if (current.ok) {
        timeline.value = [...timeline.value, `Attempt ${attempt} succeeded`];
        result.value = current;
        return current;
      }

      timeline.value = [
        ...timeline.value,
        `Attempt ${attempt} failed: ${current.error.kind}`,
      ];

      if (!shouldRetryRequest(method, current.error, attempt, config)) {
        result.value = current;
        return current;
      }

      const delay = getRetryDelay(attempt, config);
      timeline.value = [...timeline.value, `Retry scheduled in ${delay}ms`];
      recordTimelineEvent(
        current.error.requestId ?? "unknown",
        "retry-scheduled",
        `${delay}ms after attempt ${attempt}`,
      );
      await wait(delay);
    }

    const fallback = await request(config.maxAttempts);
    result.value = fallback;
    return fallback;
  }

  return {
    attemptCount,
    timeline,
    result,
    execute,
  };
}
