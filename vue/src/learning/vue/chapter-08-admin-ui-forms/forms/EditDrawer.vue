<script setup lang="ts">
import { computed } from "vue";
import type { CrudMode } from "../contracts/adminUiTypes";
import type { ProductFormModel } from "../contracts/formContracts";
import ProductForm from "./ProductForm.vue";

const visible = defineModel<boolean>("visible", { required: true });
const draft = defineModel<ProductFormModel>("draft", { required: true });

const props = defineProps<{
  mode: CrudMode;
  dirty: boolean;
}>();

const emit = defineEmits<{
  submit: [];
  close: [];
  change: [];
}>();

const title = computed(() =>
  props.mode === "create" ? "Create product" : "Edit product",
);

function close(): void {
  visible.value = false;
  emit("close");
}
</script>

<template>
  <ElDrawer
    v-model="visible"
    :title="title"
    size="min(520px, 92vw)"
    destroy-on-close
    @closed="emit('close')"
  >
    <ElAlert
      v-if="dirty"
      title="This local draft has unsaved changes."
      type="warning"
      :closable="false"
      show-icon
    />
    <ProductForm
      v-model="draft"
      @cancel="close"
      @change="emit('change')"
      @submit="emit('submit')"
    />
  </ElDrawer>
</template>
