<script setup lang="ts">
import { computed, inject } from "vue";
import { productSelectionKey } from "../contracts/injectionKey";

const selectionContext = inject(productSelectionKey);

const selectedLabel = computed(
  () => selectionContext?.selectedProductId.value ?? "No selection",
);

function selectFallbackProduct(): void {
  selectionContext?.selectProduct("product-2");
}
</script>

<template>
  <section class="consumer">
    <strong>Injected selection: {{ selectedLabel }}</strong>
    <button
      type="button"
      :disabled="!selectionContext"
      @click="selectFallbackProduct"
    >
      Select product-2
    </button>
    <p v-if="!selectionContext">Provider is unavailable.</p>
  </section>
</template>

<style scoped>
.consumer {
  display: grid;
  gap: 0.6rem;
  padding: 0.75rem;
  border-radius: 0.55rem;
  background: #eef8f3;
}

button {
  width: fit-content;
  padding: 0.45rem 0.65rem;
  border: 1px solid #6d9a82;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
