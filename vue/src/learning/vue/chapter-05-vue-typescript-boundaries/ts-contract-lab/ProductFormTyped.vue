<script setup lang="ts">
import type {
  ProductCategory,
  ProductForm,
  ProductStatus,
} from "../contracts/productContract";

const form = defineModel<ProductForm>({ required: true });

const emit = defineEmits<{
  submit: [form: ProductForm];
  reset: [];
}>();

function updateTextField(
  field: "name" | "price",
  event: Event,
): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    form.value = {
      ...form.value,
      [field]: input.value,
    };
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
    const status: ProductStatus = select.value;
    form.value = { ...form.value, status };
  }
}

function updateCategory(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "course" || select.value === "tool")
  ) {
    const category: ProductCategory = select.value;
    form.value = { ...form.value, category };
  }
}

function submitForm(): void {
  emit("submit", {
    ...form.value,
    tags: [...form.value.tags],
  });
}
</script>

<template>
  <form class="product-form" @submit.prevent="submitForm">
    <label>
      Name
      <input
        :value="form.name"
        type="text"
        @input="updateTextField('name', $event)"
      />
    </label>
    <label>
      Price
      <input
        :value="form.price"
        inputmode="decimal"
        @input="updateTextField('price', $event)"
      />
    </label>
    <label>
      Status
      <select :value="form.status" @change="updateStatus">
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
    </label>
    <label>
      Category
      <select :value="form.category" @change="updateCategory">
        <option value="course">Course</option>
        <option value="tool">Tool</option>
      </select>
    </label>
    <div class="actions">
      <button type="submit">Submit typed form</button>
      <button type="button" @click="emit('reset')">Reset</button>
    </div>
  </form>
</template>

<style scoped>
.product-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.7rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 700;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #8ca3b2;
  border-radius: 0.4rem;
}

.actions {
  display: flex;
  align-items: end;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #718fa3;
  border-radius: 0.4rem;
  background: #f5f9fb;
  cursor: pointer;
}
</style>
