import {
  computed,
  ref,
  type ComputedRef,
  type Ref,
} from "vue";
import {
  toProductListResult,
  type ApiError,
  type ProductListResponse,
  type Result,
} from "../contracts/apiContract";
import {
  emptyProductFilter,
  type Product,
  type ProductFilter,
} from "../contracts/productContract";

export type ProductLoadStatus = "idle" | "loading" | "success" | "error";

export type TypedProductsState = {
  data: Ref<ReadonlyArray<Product>>;
  error: Ref<ApiError | null>;
  status: Ref<ProductLoadStatus>;
  filter: Ref<ProductFilter>;
  filteredProducts: ComputedRef<ReadonlyArray<Product>>;
  loadProducts: (
    simulateInvalid?: boolean,
  ) => Promise<Result<ProductListResponse, ApiError>>;
  setFilter: (filter: ProductFilter) => void;
};

const localProducts = [
  {
    id: "product-1",
    name: "Vue Component Patterns",
    price: 48,
    status: "active",
    category: "course",
    tags: ["vue", "components"],
  },
  {
    id: "product-2",
    name: "Type Boundary Inspector",
    price: 29,
    status: "draft",
    category: "tool",
    tags: ["typescript", "tooling"],
  },
  {
    id: "product-3",
    name: "Reactivity Field Guide",
    price: 36,
    status: "archived",
    category: "course",
    tags: ["reactivity"],
  },
] satisfies Array<Product>;

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function useTypedProducts(): TypedProductsState {
  const data = ref<ReadonlyArray<Product>>([]);
  const error = ref<ApiError | null>(null);
  const status = ref<ProductLoadStatus>("idle");
  const filter = ref<ProductFilter>({ ...emptyProductFilter });

  const filteredProducts = computed(() => {
    const normalizedSearch = filter.value.search.trim().toLowerCase();

    return data.value.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesStatus =
        filter.value.status === "all" ||
        product.status === filter.value.status;
      const matchesCategory =
        filter.value.category === "all" ||
        product.category === filter.value.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  });

  function setFilter(nextFilter: ProductFilter): void {
    filter.value = { ...nextFilter };
  }

  async function loadProducts(
    simulateInvalid = false,
  ): Promise<Result<ProductListResponse, ApiError>> {
    status.value = "loading";
    error.value = null;
    await wait(250);

    const rawResponse: unknown = simulateInvalid
      ? {
          items: [{ id: "invalid", name: "Invalid", price: "free" }],
          total: 1,
        }
      : {
          items: localProducts,
          total: localProducts.length,
        };

    const result = toProductListResult(rawResponse);

    if (result.ok) {
      data.value = result.data.items;
      status.value = "success";
    } else {
      data.value = [];
      error.value = result.error;
      status.value = "error";
    }

    return result;
  }

  return {
    data,
    error,
    status,
    filter,
    filteredProducts,
    loadProducts,
    setFilter,
  };
}
