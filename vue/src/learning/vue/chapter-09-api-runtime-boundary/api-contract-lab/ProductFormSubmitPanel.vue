<script setup lang="ts">
import { reactive, ref } from "vue";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import { useFormSubmit } from "../composables/useFormSubmit";
import { createProduct } from "../services/productApi";
import { productFormPayloadSchema } from "../validators/formPayloadValidator";
import ApiErrorPanel from "./ApiErrorPanel.vue";

const scenario = ref<MockBackendScenario>("success");
const form = reactive({
  name: "Contract Lab Product",
  category: "Learning",
  price: 89,
  stock: 15,
});
const state = useFormSubmit(
  productFormPayloadSchema,
  (payload) => createProduct(payload, { scenario: scenario.value }),
);
</script>

<template>
  <ElCard header="Product form submit" shadow="never">
    <ElForm label-position="top" @submit.prevent="state.submit(form)">
      <ElFormItem label="Name"><ElInput v-model="form.name" /></ElFormItem>
      <ElFormItem label="Category">
        <ElInput v-model="form.category" />
      </ElFormItem>
      <ElFormItem label="Price">
        <ElInputNumber v-model="form.price" :min="0" />
      </ElFormItem>
      <ElFormItem label="Stock">
        <ElInputNumber v-model="form.stock" :min="0" />
      </ElFormItem>
      <ElFormItem label="Scenario">
        <ElSelect v-model="scenario">
          <ElOption label="Success" value="success" />
          <ElOption label="Conflict" value="conflict" />
          <ElOption label="Validation error" value="validationError" />
        </ElSelect>
      </ElFormItem>
      <ElButton
        native-type="submit"
        type="primary"
        :loading="state.isSubmitting.value"
      >
        Validate and submit
      </ElButton>
    </ElForm>
    <ApiErrorPanel :error="state.error.value" />
    <ElResult
      v-if="state.data.value"
      icon="success"
      title="Product created"
      :sub-title="state.data.value.name"
    />
  </ElCard>
</template>
