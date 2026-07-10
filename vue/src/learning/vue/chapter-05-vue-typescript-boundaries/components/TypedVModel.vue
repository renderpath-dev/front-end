<script setup lang="ts">
import type { ProductStatus } from "../contracts/productContract";

const title = defineModel<string>({ required: true });
const status = defineModel<ProductStatus>("status", { required: true });

function updateTitle(event: Event): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    title.value = input.value;
  }
}

function updateStatus(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "draft" ||
      select.value === "active" ||
      select.value === "archived")
  ) {
    status.value = select.value;
  }
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Typed component model</p>
    <h3>Required Default and Named Models</h3>
    <label>
      Title
      <input :value="title" type="text" @input="updateTitle" />
    </label>
    <label>
      Status
      <select :value="status" @change="updateStatus">
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
    </label>
    <p>{{ title }} · {{ status }}</p>
  </article>
</template>

<style scoped>
.demo-card {
  display: grid;
  gap: 0.65rem;
  padding: 1.1rem;
  border: 1px solid #c6d9d0;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #277052;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: -0.25rem 0 0.25rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 700;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #86a898;
  border-radius: 0.4rem;
}
</style>
