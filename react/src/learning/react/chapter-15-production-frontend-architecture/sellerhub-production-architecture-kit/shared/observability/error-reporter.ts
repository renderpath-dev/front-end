export type ErrorReportContext = {
  route: string
  feature: string
  release: string
  sessionReference: string
}

export type FrontendErrorEvent = ErrorReportContext & {
  eventId: string
  code: string
  message: string
  occurredAt: string
}

export type ErrorReporter = {
  getEvents: () => FrontendErrorEvent[]
  report: (error: unknown, context: ErrorReportContext) => FrontendErrorEvent
}

export function createErrorReporter(): ErrorReporter {
  let events: FrontendErrorEvent[] = []

  return {
    getEvents(): FrontendErrorEvent[] {
      return [...events]
    },
    report(error: unknown, context: ErrorReportContext): FrontendErrorEvent {
      const knownError = error instanceof Error ? error : new Error('Unknown client error')
      const event: FrontendErrorEvent = {
        ...context,
        eventId: `event-${Date.now()}-${events.length + 1}`,
        code: knownError.name.toUpperCase(),
        message: knownError.message,
        occurredAt: new Date().toISOString(),
      }
      events = [event, ...events].slice(0, 5)
      return event
    },
  }
}
