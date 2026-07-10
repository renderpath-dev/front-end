<script setup lang="ts">
import { reactive, ref } from "vue";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import { useFormSubmit } from "../composables/useFormSubmit";
import { createProduct } from "../services/productApi";
import { productFormPayloadSchema } from "../validators/formPayloadValidator";

const scenario = ref<MockBackendScenario>("success");
const form = reactive({
  name: "Runtime Contract",
  category: "Course",
  price: 59,
  stock: 20,
});

const submitState = useFormSubmit(
  productFormPayloadSchema,
  (payload) => createProduct(payload, { scenario: scenario.value }),
);
</script>

<template>
  <ElCard header="Form payload boundary" shadow="never">
    <ElForm label-position="top" @submit.prevent="submitState.submit(form)">
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
      <ElFormItem label="Backend scenario">
        <ElSelect v-model="scenario">
          <ElOption label="Success" value="success" />
          <ElOption label="Validation error" value="validationError" />
          <ElOption label="Conflict" value="conflict" />
        </ElSelect>
      </ElFormItem>
      <ElButton
        native-type="submit"
        type="primary"
        :loading="submitState.isSubmitting.value"
      >
        Submit payload
      </ElButton>
    </ElForm>
    <ElAlert
      v-if="submitState.error.value"
      :title="submitState.error.value.kind"
      :description="submitState.error.value.message"
      type="error"
      :closable="false"
      show-icon
    />
    <ElAlert
      v-if="submitState.data.value"
      :title="`Created ${submitState.data.value.name}`"
      type="success"
      :closable="false"
      show-icon
    />
  </ElCard>
</template>
