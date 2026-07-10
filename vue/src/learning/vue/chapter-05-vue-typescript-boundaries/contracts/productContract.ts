export type ProductId = string;

export type ProductStatus = "draft" | "active" | "archived";

export type ProductCategory = "course" | "tool";

export type Product = {
  id: ProductId;
  name: string;
  price: number;
  status: ProductStatus;
  category: ProductCategory;
  tags: ReadonlyArray<string>;
};

export type ProductForm = {
  name: string;
  price: string;
  status: ProductStatus;
  category: ProductCategory;
  tags: Array<string>;
};

export type ProductFilter = {
  search: string;
  status: ProductStatus | "all";
  category: ProductCategory | "all";
};

export type ProductCardProps = {
  product: Product;
  badges?: ReadonlyArray<string>;
};

export const emptyProductForm = {
  name: "",
  price: "",
  status: "draft",
  category: "course",
  tags: [],
} satisfies ProductForm;

export const emptyProductFilter = {
  search: "",
  status: "all",
  category: "all",
} satisfies ProductFilter;
