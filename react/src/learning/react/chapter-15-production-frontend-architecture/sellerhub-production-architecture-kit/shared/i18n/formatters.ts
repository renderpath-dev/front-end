import type { Locale } from './messages'

export function formatCurrency(locale: Locale, amountInCents: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-US' ? 'USD' : 'GBP',
  }).format(amountInCents / 100)
}

export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date)
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale).format(value)
}
