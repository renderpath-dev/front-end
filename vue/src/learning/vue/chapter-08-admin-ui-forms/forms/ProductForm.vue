<script setup lang="ts">
import type { FormRules } from "element-plus";
import { useElementFormValidation } from "../composables/useElementFormValidation";
import type { ProductFormModel } from "../contracts/formContracts";

const model = defineModel<ProductFormModel>({ required: true });

const emit = defineEmits<{
  submit: [];
  cancel: [];
  change: [];
}>();

const { formRef, validate } = useElementFormValidation();

const rules: FormRules<ProductFormModel> = {
  name: [{ required: true, message: "Name is required", trigger: "blur" }],
  category: [
    { required: true, message: "Category is required", trigger: "blur" },
  ],
  price: [
    { required: true, message: "Price is required", trigger: "change" },
    { type: "number", min: 0, message: "Price cannot be negative" },
  ],
  stock: [
    { required: true, message: "Stock is required", trigger: "change" },
    { type: "number", min: 0, message: "Stock cannot be negative" },
  ],
  status: [
    { required: true, message: "Status is required", trigger: "change" },
  ],
};

async function submit(): Promise<void> {
  const result = await validate();
  if (result.valid) {
    emit("submit");
  }
}
</script>

<template>
  <ElForm
    ref="formRef"
    :model="model"
    :rules="rules"
    label-position="top"
    @change="emit('change')"
    @submit.prevent="submit"
  >
    <ElFormItem label="Name" prop="name">
      <ElInput v-model="model.name" />
    </ElFormItem>
    <ElFormItem label="Category" prop="category">
      <ElInput v-model="model.category" />
    </ElFormItem>
    <ElFormItem label="Price" prop="price">
      <ElInputNumber v-model="model.price" :min="0" :precision="2" />
    </ElFormItem>
    <ElFormItem label="Stock" prop="stock">
      <ElInputNumber v-model="model.stock" :min="0" :precision="0" />
    </ElFormItem>
    <ElFormItem label="Status" prop="status">
      <ElSelect v-model="model.status">
        <ElOption label="Active" value="active" />
        <ElOption label="Draft" value="draft" />
      </ElSelect>
    </ElFormItem>
    <div class="form-actions">
      <ElButton @click="emit('cancel')">Cancel</ElButton>
      <ElButton native-type="submit" type="primary">Save product</ElButton>
    </div>
  </ElForm>
</template>

<style scoped>
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
