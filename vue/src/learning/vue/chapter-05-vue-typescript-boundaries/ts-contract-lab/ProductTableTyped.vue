<script setup lang="ts">
import type {
  Product,
  ProductId,
} from "../contracts/productContract";

type Props = {
  products: ReadonlyArray<Product>;
};

defineProps<Props>();

defineSlots<{
  row(props: { product: Product; index: number }): unknown;
  actions(props: { productId: ProductId; product: Product }): unknown;
}>();
</script>

<template>
  <div class="table-list">
    <article
      v-for="(product, index) in products"
      :key="product.id"
      class="table-row"
    >
      <div>
        <slot name="row" :product="product" :index="index">
          {{ product.name }}
        </slot>
      </div>
      <div>
        <slot
          name="actions"
          :product-id="product.id"
          :product="product"
        />
      </div>
    </article>
    <p v-if="products.length === 0">No products match the typed filter.</p>
  </div>
</template>

<style scoped>
.table-list {
  display: grid;
  gap: 0.55rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.65rem;
  border: 1px solid #d6dee5;
  border-radius: 0.55rem;
  background: #f9fbfc;
}
</style>
