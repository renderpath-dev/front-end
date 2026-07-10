<script setup lang="ts">
import type { PropType } from "vue";
import type { ProductStoreContract } from "../contracts/storeContract";

const props = defineProps({
  store: {
    type: Object as PropType<ProductStoreContract>,
    required: true,
  },
});
</script>

<template>
  <section class="contract-panel">
    <h4>Pure TypeScript Store Contract</h4>
    <p>Products: {{ props.store.state.products.length }}</p>
    <p>Active: {{ props.store.getters.activeProducts().length }}</p>
    <p>
      Selected:
      {{ props.store.getters.selectedProduct()?.name ?? "None" }}
    </p>
    <button
      v-if="props.store.state.products[0]"
      type="button"
      @click="
        props.store.actions.selectProduct(
          props.store.state.products[0].id,
        )
      "
    >
      Select first product
    </button>
  </section>
</template>

<style scoped>
.contract-panel {
  padding: 0.85rem;
  border-radius: 0.6rem;
  background: #eef5fa;
}

h4 {
  margin: 0 0 0.6rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7994a7;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
