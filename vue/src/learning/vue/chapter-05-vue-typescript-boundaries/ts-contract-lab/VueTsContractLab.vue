<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { emptyProductForm } from "../contracts/productContract";
import type {
  Product,
  ProductFilter,
  ProductForm,
  ProductId,
} from "../contracts/productContract";
import { productRouteContract } from "../contracts/routeMetaContract";
import type {
  ProductStoreContract,
  ProductStoreState,
} from "../contracts/storeContract";
import { useProductForm } from "../composables/useProductForm";
import { useTypedProducts } from "../composables/useTypedProducts";
import ProductApiContractDemo from "./ProductApiContractDemo.vue";
import ProductCardTyped from "./ProductCardTyped.vue";
import ProductFilterTyped from "./ProductFilterTyped.vue";
import ProductFormTyped from "./ProductFormTyped.vue";
import ProductStoreContractDemo from "./ProductStoreContractDemo.vue";
import ProductTableTyped from "./ProductTableTyped.vue";

const {
  data,
  error,
  status,
  filter,
  filteredProducts,
  loadProducts,
  setFilter,
} = useTypedProducts();

const filterModel = computed<ProductFilter>({
  get: () => filter.value,
  set: setFilter,
});

const {
  values: productForm,
  errors: formErrors,
  validate: validateForm,
  reset: resetForm,
} = useProductForm(emptyProductForm);

const initialStoreState: ProductStoreState = {
  products: [],
  selectedProductId: null,
  loading: false,
};
const storeState = reactive(initialStoreState);

const store = {
  state: storeState,
  getters: {
    activeProducts: () =>
      storeState.products.filter(
        (product) => product.status === "active",
      ),
    selectedProduct: () =>
      storeState.products.find(
        (product) => product.id === storeState.selectedProductId,
      ) ?? null,
  },
  actions: {
    setProducts: (products: ReadonlyArray<Product>) => {
      storeState.products = [...products];
    },
    selectProduct: (productId: ProductId) => {
      storeState.selectedProductId = productId;
    },
    archiveProduct: (productId: ProductId) => {
      storeState.products = storeState.products.map((product) =>
        product.id === productId
          ? { ...product, status: "archived" }
          : product,
      );
    },
  },
} satisfies ProductStoreContract;

const eventLog = ref("No typed lab action yet.");

watch(
  data,
  (products) => {
    store.actions.setProducts(products);
  },
  { immediate: true },
);

async function loadAndSync(simulateInvalid: boolean): Promise<void> {
  storeState.loading = true;
  const result = await loadProducts(simulateInvalid);
  storeState.loading = false;

  if (result.ok) {
    store.actions.setProducts(result.data.items);
    eventLog.value = `Loaded ${result.data.total} typed products.`;
  } else {
    store.actions.setProducts([]);
    eventLog.value = result.error.message;
  }
}

function handleEdit(productId: ProductId): void {
  store.actions.selectProduct(productId);
  eventLog.value = `Edit intent: ${productId}`;
}

function handleArchive(payload: {
  productId: ProductId;
  previousStatus: Product["status"];
}): void {
  store.actions.archiveProduct(payload.productId);
  eventLog.value =
    `Archive intent: ${payload.productId} from ${payload.previousStatus}`;
}

function submitProduct(form: ProductForm): void {
  if (!validateForm()) {
    eventLog.value = formErrors.value.name ??
      formErrors.value.price ??
      "Form validation failed.";
    return;
  }

  const product: Product = {
    id: `local-${storeState.products.length + 1}`,
    name: form.name.trim(),
    price: Number(form.price),
    status: form.status,
    category: form.category,
    tags: [...form.tags],
  };

  store.actions.setProducts([...storeState.products, product]);
  eventLog.value = `Submitted ${product.name}.`;
  resetForm();
}

onMounted(() => {
  void loadAndSync(false);
});
</script>

<template>
  <section class="contract-lab" aria-labelledby="contract-lab-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="contract-lab-title">Vue TS Contract Lab</h3>
      <p>
        One Product contract crosses props, emits, models, slots,
        composables, an unknown API boundary, and a future store boundary.
      </p>
    </header>

    <div class="load-actions">
      <button type="button" @click="loadAndSync(false)">
        Load valid local payload
      </button>
      <button type="button" @click="loadAndSync(true)">
        Load invalid local payload
      </button>
      <span>Status: {{ status }}</span>
    </div>

    <p v-if="error" class="error">
      {{ error.code }}: {{ error.message }}
    </p>

    <ProductFilterTyped v-model="filterModel" />

    <ProductTableTyped :products="filteredProducts">
      <template #row="{ product }">
        <ProductCardTyped
          :product="product"
          @edit="handleEdit"
          @archive="handleArchive"
        />
      </template>
      <template #actions="{ productId }">
        <button type="button" @click="store.actions.selectProduct(productId)">
          Select in store contract
        </button>
      </template>
    </ProductTableTyped>

    <section class="panel">
      <h4>Typed ProductForm model</h4>
      <ProductFormTyped
        v-model="productForm"
        @submit="submitProduct"
        @reset="resetForm"
      />
      <p v-if="formErrors.name" class="error">{{ formErrors.name }}</p>
      <p v-if="formErrors.price" class="error">{{ formErrors.price }}</p>
    </section>

    <div class="contract-grid">
      <ProductStoreContractDemo :store="store" />
      <ProductApiContractDemo />
    </div>

    <section class="panel">
      <h4>Future route meta contract</h4>
      <p>
        {{ productRouteContract.path }} ·
        auth: {{ productRouteContract.meta.requiresAuth }} ·
        permissions:
        {{ productRouteContract.meta.requiredPermissions.join(", ") }}
      </p>
    </section>

    <p class="event-log">{{ eventLog }}</p>
  </section>
</template>

<style scoped>
.contract-lab {
  display: grid;
  gap: 1rem;
  padding: 1.4rem;
  border: 2px solid #6e8ea5;
  border-radius: 1rem;
  background: #f4f8fb;
}

.topic {
  margin: 0;
  color: #386780;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

h4 {
  margin: 0 0 0.65rem;
}

.load-actions,
.contract-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.contract-grid > * {
  flex: 1 1 280px;
}

.panel {
  padding: 0.9rem;
  border: 1px solid #cbd8e1;
  border-radius: 0.65rem;
  background: #ffffff;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7293a8;
  border-radius: 0.4rem;
  background: #ffffff;
  color: #345c73;
  cursor: pointer;
}

.error {
  color: #b42318;
}

.event-log {
  margin: 0;
  padding: 0.7rem;
  border-radius: 0.45rem;
  background: #eaf1f6;
}
</style>
