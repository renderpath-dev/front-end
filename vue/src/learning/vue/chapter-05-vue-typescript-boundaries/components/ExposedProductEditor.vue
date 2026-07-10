<script setup lang="ts">
import { useTemplateRef } from "vue";
import { emptyProductForm } from "../contracts/productContract";
import type { ProductForm } from "../contracts/productContract";
import { useProductForm } from "../composables/useProductForm";

const nameInput = useTemplateRef<HTMLInputElement>("editor-name-input");
const {
  values,
  errors,
  setFieldValue,
  setFieldTouched,
  validate,
  reset,
} = useProductForm(emptyProductForm);

function updateName(event: Event): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    setFieldValue("name", input.value);
  }
}

function focusNameInput(): void {
  nameInput.value?.focus();
}

function resetDraft(): void {
  reset();
}

function getDraftSnapshot(): ProductForm {
  return {
    ...values.value,
    tags: [...values.value.tags],
  };
}

defineExpose({
  focusNameInput,
  resetDraft,
  getDraftSnapshot,
});
</script>

<template>
  <section class="editor">
    <label for="exposed-editor-name">Editor name</label>
    <input
      id="exposed-editor-name"
      ref="editor-name-input"
      :value="values.name"
      type="text"
      @input="updateName"
      @blur="setFieldTouched('name')"
    />
    <p v-if="errors.name" class="error">{{ errors.name }}</p>
    <button type="button" @click="validate">Validate draft</button>
  </section>
</template>

<style scoped>
.editor {
  display: grid;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.55rem;
  background: #f6f3fb;
}

label {
  font-weight: 700;
}

input {
  padding: 0.5rem;
  border: 1px solid #a08db2;
  border-radius: 0.4rem;
}

button {
  width: fit-content;
  padding: 0.4rem 0.6rem;
  border: 1px solid #8d72a2;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

.error {
  color: #b42318;
}
</style>
