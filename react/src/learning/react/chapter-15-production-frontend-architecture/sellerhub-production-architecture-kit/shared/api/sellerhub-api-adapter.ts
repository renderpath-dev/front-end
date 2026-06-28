import type { CatalogProductDto } from './sellerhub-api-contract'
import type { Locale } from '../i18n/messages'
import { formatCurrency, formatNumber } from '../i18n/formatters'

export type CatalogProduct = {
  id: string
  name: string
  priceInCents: number
  stockCount: number
}

export type CatalogProductViewModel = {
  id: string
  title: string
  priceLabel: string
  stockLabel: string
}

export function adaptCatalogProduct(dto: CatalogProductDto): CatalogProduct {
  return {
    id: dto.product_id,
    name: dto.display_name,
    priceInCents: dto.price_cents,
    stockCount: dto.stock_count,
  }
}

export function toCatalogProductViewModel(
  product: CatalogProduct,
  locale: Locale,
): CatalogProductViewModel {
  return {
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(locale, product.priceInCents),
    stockLabel: `${formatNumber(locale, product.stockCount)} in stock`,
  }
}
