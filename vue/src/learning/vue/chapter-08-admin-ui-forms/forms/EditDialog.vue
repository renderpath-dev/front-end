<script setup lang="ts">
import { computed } from "vue";
import type { CrudMode } from "../contracts/adminUiTypes";
import type { UserFormModel } from "../contracts/formContracts";
import UserForm from "./UserForm.vue";

const visible = defineModel<boolean>("visible", { required: true });
const draft = defineModel<UserFormModel>("draft", { required: true });

const props = defineProps<{
  mode: CrudMode;
}>();

const emit = defineEmits<{
  submit: [];
  close: [];
}>();

const title = computed(() =>
  props.mode === "create" ? "Create user" : "Edit user",
);

function close(): void {
  visible.value = false;
  emit("close");
}
</script>

<template>
  <ElDialog
    v-model="visible"
    :title="title"
    width="min(520px, 92vw)"
    destroy-on-close
    @closed="emit('close')"
  >
    <UserForm
      v-model="draft"
      @cancel="close"
      @submit="emit('submit')"
    />
  </ElDialog>
</template>
