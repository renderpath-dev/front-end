import type { InjectionKey, Ref } from "vue";
import type { ProductId } from "./productContract";

export type ProductSelectionContext = {
  selectedProductId: Readonly<Ref<ProductId | null>>;
  selectProduct: (productId: ProductId) => void;
};

export const productSelectionKey: InjectionKey<ProductSelectionContext> =
  Symbol("product-selection");
