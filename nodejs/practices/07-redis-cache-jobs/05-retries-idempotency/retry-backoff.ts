import type { JobsOptions } from "bullmq";

export const exportJobRetryOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000
  },
  removeOnComplete: false,
  removeOnFail: false
};

console.log(exportJobRetryOptions);
