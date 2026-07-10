<script setup lang="ts">
import type {
  ProductCategory,
  ProductFilter,
  ProductStatus,
} from "../contracts/productContract";

const filter = defineModel<ProductFilter>({ required: true });

function updateSearch(event: Event): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    filter.value = {
      ...filter.value,
      search: input.value,
    };
  }
}

function updateStatus(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "all" ||
      select.value === "draft" ||
      select.value === "active" ||
      select.value === "archived")
  ) {
    const status: ProductStatus | "all" = select.value;
    filter.value = { ...filter.value, status };
  }
}

function updateCategory(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "all" ||
      select.value === "course" ||
      select.value === "tool")
  ) {
    const category: ProductCategory | "all" = select.value;
    filter.value = { ...filter.value, category };
  }
}
</script>

<template>
  <section class="filter-panel">
    <label>
      Search
      <input
        :value="filter.search"
        type="search"
        @input="updateSearch"
      />
    </label>
    <label>
      Status
      <select :value="filter.status" @change="updateStatus">
        <option value="all">All</option>
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
    </label>
    <label>
      Category
      <select :value="filter.category" @change="updateCategory">
        <option value="all">All</option>
        <option value="course">Course</option>
        <option value="tool">Tool</option>
      </select>
    </label>
  </section>
</template>

<style scoped>
.filter-panel {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.65rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 700;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #8da5b4;
  border-radius: 0.4rem;
}

@media (max-width: 620px) {
  .filter-panel {
    grid-template-columns: 1fr;
  }
}
</style>
