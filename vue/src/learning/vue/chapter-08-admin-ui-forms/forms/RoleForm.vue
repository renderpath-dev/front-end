<script setup lang="ts">
import type { RoleFormModel } from "../contracts/formContracts";

const model = defineModel<RoleFormModel>({ required: true });

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const permissionOptions = [
  "dashboard:view",
  "users:view",
  "roles:view",
  "products:view",
  "orders:view",
  "uploads:manage",
] as const;
</script>

<template>
  <ElForm label-position="top" @submit.prevent="emit('submit')">
    <ElFormItem label="Role name">
      <ElInput v-model="model.name" />
    </ElFormItem>
    <ElFormItem label="Role">
      <ElSelect v-model="model.role">
        <ElOption label="Admin" value="admin" />
        <ElOption label="Manager" value="manager" />
        <ElOption label="Operator" value="operator" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Visible capabilities">
      <ElCheckboxGroup v-model="model.permissions">
        <ElCheckbox
          v-for="permission in permissionOptions"
          :key="permission"
          :value="permission"
        >
          {{ permission }}
        </ElCheckbox>
      </ElCheckboxGroup>
    </ElFormItem>
    <div class="form-actions">
      <ElButton @click="emit('cancel')">Cancel</ElButton>
      <ElButton native-type="submit" type="primary">Save role</ElButton>
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
