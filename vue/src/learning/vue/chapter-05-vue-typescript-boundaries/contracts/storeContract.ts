import type { Product, ProductId } from "./productContract";

export type ProductStoreState = {
  products: Array<Product>;
  selectedProductId: ProductId | null;
  loading: boolean;
};

export type ProductStoreGetters = {
  activeProducts: () => ReadonlyArray<Product>;
  selectedProduct: () => Product | null;
};

export type ProductStoreActions = {
  setProducts: (products: ReadonlyArray<Product>) => void;
  selectProduct: (productId: ProductId) => void;
  archiveProduct: (productId: ProductId) => void;
};

export type ProductStoreContract = {
  state: ProductStoreState;
  getters: ProductStoreGetters;
  actions: ProductStoreActions;
};
