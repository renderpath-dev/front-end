export type ApiPaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  sort: string;
  order: "ascending" | "descending";
};

export type ApiSuccessEnvelope<Value> = {
  data: Value;
  requestId: string;
};

export type ApiErrorEnvelope = {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, ReadonlyArray<string>>;
  };
  requestId: string;
};

export type ApiListEnvelope<Item> = {
  data: ReadonlyArray<Item>;
  meta: ApiPaginationMeta;
  requestId: string;
};

export type ApiMutationEnvelope<Item> = {
  data: Item;
  message: string;
  requestId: string;
};
