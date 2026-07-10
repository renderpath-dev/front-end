<script setup lang="ts">
import { computed, ref } from "vue";
import { usePagination } from "../composables/usePagination";

const items = Array.from(
  { length: 23 },
  (_, index) => `Learning item ${index + 1}`,
);
const totalItems = ref(items.length);
const pageSize = ref(5);

const {
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  canGoPrevious,
  canGoNext,
  nextPage,
  previousPage,
  goToPage,
} = usePagination({
  totalItems,
  pageSize,
});

const visibleItems = computed(() =>
  items.slice(startIndex.value, endIndex.value),
);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Derived state</p>
    <h3>Guarded Pagination</h3>
    <p>
      Page {{ currentPage }} of {{ totalPages }} · items
      {{ startIndex + 1 }}–{{ endIndex }} of {{ totalItems }}
    </p>
    <ul>
      <li v-for="item in visibleItems" :key="item">{{ item }}</li>
    </ul>
    <div class="actions">
      <button
        type="button"
        :disabled="!canGoPrevious"
        @click="previousPage"
      >
        Previous
      </button>
      <button type="button" @click="goToPage(3)">Page 3</button>
      <button type="button" :disabled="!canGoNext" @click="nextPage">
        Next
      </button>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #cbd9e8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #32648e;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

ul {
  min-height: 7.5rem;
  padding-left: 1.25rem;
}

.actions {
  display: flex;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7193b3;
  border-radius: 0.4rem;
  background: #f1f6fb;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
