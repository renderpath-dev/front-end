export type MockBackendScenario =
  | "success"
  | "invalidProductShape"
  | "malformedPagination"
  | "badRequest"
  | "unauthenticated"
  | "forbidden"
  | "notFound"
  | "conflict"
  | "validationError"
  | "serverError"
  | "networkError"
  | "timeout"
  | "slow";

export type RequestTimelineEventType =
  | "request-created"
  | "request-interceptor"
  | "adapter-started"
  | "response-received"
  | "validation-passed"
  | "validation-failed"
  | "retry-scheduled"
  | "request-canceled"
  | "timeout"
  | "completed";

export type RequestTimelineEvent = {
  id: number;
  requestId: string;
  type: RequestTimelineEventType;
  detail: string;
  occurredAt: number;
};

export const mockBackendScenarios: ReadonlyArray<MockBackendScenario> = [
  "success",
  "invalidProductShape",
  "malformedPagination",
  "badRequest",
  "unauthenticated",
  "forbidden",
  "notFound",
  "conflict",
  "validationError",
  "serverError",
  "networkError",
  "timeout",
  "slow",
];

let timelineSequence = 0;
let timelineEvents: Array<RequestTimelineEvent> = [];

export function isMockBackendScenario(
  value: unknown,
): value is MockBackendScenario {
  return (
    typeof value === "string" &&
    mockBackendScenarios.some((scenario) => scenario === value)
  );
}

export function recordTimelineEvent(
  requestId: string,
  type: RequestTimelineEventType,
  detail: string,
): void {
  timelineSequence += 1;
  timelineEvents = [
    ...timelineEvents.slice(-39),
    {
      id: timelineSequence,
      requestId,
      type,
      detail,
      occurredAt: Date.now(),
    },
  ];
}

export function readTimelineEvents(): ReadonlyArray<RequestTimelineEvent> {
  return timelineEvents.map((event) => ({ ...event }));
}

export function clearTimelineEvents(): void {
  timelineEvents = [];
}
