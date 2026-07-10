<script setup lang="ts">
import type { OrderStatusFormModel } from "../contracts/formContracts";

const model = defineModel<OrderStatusFormModel>({ required: true });

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
</script>

<template>
  <ElForm label-position="top" @submit.prevent="emit('submit')">
    <ElFormItem label="Order">
      <ElInput :model-value="model.id" disabled />
    </ElFormItem>
    <ElFormItem label="Status">
      <ElSelect v-model="model.status">
        <ElOption label="Pending" value="pending" />
        <ElOption label="Processing" value="processing" />
        <ElOption label="Completed" value="completed" />
        <ElOption label="Cancelled" value="cancelled" />
      </ElSelect>
    </ElFormItem>
    <div class="form-actions">
      <ElButton @click="emit('cancel')">Cancel</ElButton>
      <ElButton native-type="submit" type="primary">Update status</ElButton>
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
