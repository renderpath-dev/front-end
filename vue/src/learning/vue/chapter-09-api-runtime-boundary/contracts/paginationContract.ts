export type SortOrder = "ascending" | "descending";

export type PaginationQuery = {
  page: number;
  pageSize: number;
  sort: string;
  order: SortOrder;
};

export type PaginationMeta = PaginationQuery & {
  total: number;
};

export type PaginatedResult<Item> = {
  rows: ReadonlyArray<Item>;
  meta: PaginationMeta;
};
