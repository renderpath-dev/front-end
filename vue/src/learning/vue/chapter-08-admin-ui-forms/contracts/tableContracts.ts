export type TableSearchState = {
  keyword: string;
  status: string;
};

export type TablePaginationState = {
  page: number;
  pageSize: number;
};

export type TableSortState = {
  sort: string;
  order: "ascending" | "descending" | "";
};

export type TableQueryState = {
  search: TableSearchState;
  pagination: TablePaginationState;
  sorting: TableSortState;
};

export type TableColumnKey =
  | "name"
  | "email"
  | "department"
  | "role"
  | "status"
  | "category"
  | "price"
  | "stock"
  | "customer"
  | "total"
  | "createdAt";
