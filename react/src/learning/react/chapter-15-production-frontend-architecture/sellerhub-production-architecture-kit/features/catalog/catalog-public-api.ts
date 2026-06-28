import type { Locale } from '../../shared/i18n/messages'
import type { CatalogProductDto } from '../../shared/api/sellerhub-api-contract'
import {
  adaptCatalogProduct,
  toCatalogProductViewModel,
} from '../../shared/api/sellerhub-api-adapter'
import type { CatalogProductViewModel } from '../../shared/api/sellerhub-api-adapter'

export type { CatalogProductViewModel }

export const catalogFeatureApi = {
  mapProduct(dto: CatalogProductDto, locale: Locale): CatalogProductViewModel {
    const product = adaptCatalogProduct(dto)
    return toCatalogProductViewModel(product, locale)
  },
  productRoute(productId: string): string {
    return `/catalog/${encodeURIComponent(productId)}`
  },
}
