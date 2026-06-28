import type { SellerHubLocale } from './messages'

export function formatCurrency(
  amountInCents: number,
  locale: SellerHubLocale,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCents / 100)
}

export function formatReleaseDate(isoDate: string, locale: SellerHubLocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(isoDate))
}
