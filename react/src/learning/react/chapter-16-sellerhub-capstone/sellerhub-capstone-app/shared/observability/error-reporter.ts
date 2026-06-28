import type { SellerHubError } from '../errors/normalize-sellerhub-error'

export type SellerHubErrorEvent = {
  code: string
  feature: string
  kind: SellerHubError['kind']
  occurredAt: string
  privacy: 'no-sensitive-payload'
  release: string
  route: string
}

export type SellerHubErrorContext = {
  feature: string
  privacy: SellerHubErrorEvent['privacy']
  release: string
  route: string
}

export type SellerHubErrorReporter = {
  report: (
    context: SellerHubErrorContext,
    error: SellerHubError,
  ) => SellerHubErrorEvent
  read: () => readonly SellerHubErrorEvent[]
}

export function createSellerHubErrorReporter(): SellerHubErrorReporter {
  const events: SellerHubErrorEvent[] = []

  return {
    report(context, error) {
      const event = {
        code: error.code,
        feature: context.feature,
        kind: error.kind,
        occurredAt: new Date('2026-06-28T09:00:00.000Z').toISOString(),
        privacy: context.privacy,
        release: context.release,
        route: context.route,
      }
      events.push(event)
      return event
    },
    read() {
      return events
    },
  }
}
