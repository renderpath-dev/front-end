import type { Locale } from '../../shared/i18n/messages'
import { formatCurrency, formatDate } from '../../shared/i18n/formatters'

export type SellerOrder = {
  id: string
  totalInCents: number
  placedAt: Date
  status: 'paid' | 'packing' | 'shipped'
}

export type SellerOrderViewModel = {
  id: string
  totalLabel: string
  placedLabel: string
  statusLabel: string
}

const statusLabels: Record<SellerOrder['status'], string> = {
  paid: 'Paid',
  packing: 'Packing',
  shipped: 'Shipped',
}

export const ordersFeatureApi = {
  toViewModel(order: SellerOrder, locale: Locale): SellerOrderViewModel {
    return {
      id: order.id,
      totalLabel: formatCurrency(locale, order.totalInCents),
      placedLabel: formatDate(locale, order.placedAt),
      statusLabel: statusLabels[order.status],
    }
  },
}
