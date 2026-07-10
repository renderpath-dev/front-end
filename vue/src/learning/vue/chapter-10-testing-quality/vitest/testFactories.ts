import type { ProductFormModel } from "../../chapter-08-admin-ui-forms/contracts/formContracts";

export function createProductFormModel(
  overrides: Partial<ProductFormModel> = {},
): ProductFormModel {
  return {
    id: "product-test",
    name: "Monitor Arm",
    category: "Workspace",
    price: 79,
    stock: 12,
    status: "active",
    ...overrides,
  };
}

export function createPaginationRows(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `row-${index + 1}`,
    label: `Row ${index + 1}`,
  }));
}
