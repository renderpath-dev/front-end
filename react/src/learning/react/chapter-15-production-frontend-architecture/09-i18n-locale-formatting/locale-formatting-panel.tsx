import { useState } from 'react'

type Locale = 'en-US' | 'en-GB'

type MessageKey = 'revenue' | 'lastOrder'

const messageCatalog: Record<Locale, Record<MessageKey, string>> = {
  'en-US': {
    revenue: 'Revenue',
    lastOrder: 'Last order',
  },
  'en-GB': {
    revenue: 'Turnover',
    lastOrder: 'Latest order',
  },
}

function formatRevenue(locale: Locale, amountInCents: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-US' ? 'USD' : 'GBP',
  }).format(amountInCents / 100)
}

function formatOrderDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date)
}

export function LocaleFormattingPanel() {
  const [locale, setLocale] = useState<Locale>('en-US')
  const messages = messageCatalog[locale]

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.9 Internationalization and locale</p>
      <h2>Messages and locale-sensitive values have different owners</h2>
      <label className="chapter15-control">
        Locale
        <select
          onChange={(event) => setLocale(event.currentTarget.value as Locale)}
          value={locale}
        >
          <option value="en-US">en-US</option>
          <option value="en-GB">en-GB</option>
        </select>
      </label>
      <div className="chapter15-grid">
        <article className="chapter15-card">
          <h3>{messages.revenue}</h3>
          <p>{formatRevenue(locale, 286450)}</p>
        </article>
        <article className="chapter15-card">
          <h3>{messages.lastOrder}</h3>
          <p>{formatOrderDate(locale, new Date('2026-06-24T10:00:00.000Z'))}</p>
        </article>
      </div>
    </section>
  )
}
