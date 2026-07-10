<script setup lang="ts">
import type { FormRules } from "element-plus";
import { useElementFormValidation } from "../composables/useElementFormValidation";
import type { UserFormModel } from "../contracts/formContracts";

const model = defineModel<UserFormModel>({ required: true });

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const { formRef, validate } = useElementFormValidation();

const rules: FormRules<UserFormModel> = {
  name: [
    { required: true, message: "Name is required", trigger: "blur" },
    { min: 2, message: "Use at least two characters", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Enter a valid email", trigger: "blur" },
  ],
  department: [
    { required: true, message: "Department is required", trigger: "blur" },
  ],
  role: [{ required: true, message: "Role is required", trigger: "change" }],
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
    @submit.prevent="submit"
  >
    <ElFormItem label="Name" prop="name">
      <ElInput v-model="model.name" />
    </ElFormItem>
    <ElFormItem label="Email" prop="email">
      <ElInput v-model="model.email" />
    </ElFormItem>
    <ElFormItem label="Department" prop="department">
      <ElInput v-model="model.department" />
    </ElFormItem>
    <ElFormItem label="Role" prop="role">
      <ElSelect v-model="model.role">
        <ElOption label="Admin" value="admin" />
        <ElOption label="Manager" value="manager" />
        <ElOption label="Operator" value="operator" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Status" prop="status">
      <ElRadioGroup v-model="model.status">
        <ElRadio value="active">Active</ElRadio>
        <ElRadio value="suspended">Suspended</ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <div class="form-actions">
      <ElButton @click="emit('cancel')">Cancel</ElButton>
      <ElButton native-type="submit" type="primary">Save user</ElButton>
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
