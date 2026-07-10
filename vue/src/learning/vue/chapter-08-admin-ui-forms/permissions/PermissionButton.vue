<script setup lang="ts">
import { computed } from "vue";
import { useButtonPermission } from "../composables/useButtonPermission";
import type { OperationPermission } from "../contracts/adminUiTypes";

const props = withDefaults(
  defineProps<{
    permission: OperationPermission;
    mode?: "hidden" | "disabled";
    buttonType?: "primary" | "success" | "warning" | "danger" | "info";
  }>(),
  {
    mode: "disabled",
    buttonType: "primary",
  },
);

const emit = defineEmits<{
  click: [];
}>();

const { canOperate } = useButtonPermission();
const allowed = computed(() => canOperate(props.permission));
const visible = computed(() => props.mode !== "hidden" || allowed.value);

function click(): void {
  if (allowed.value) {
    emit("click");
  }
}
</script>

<template>
  <ElButton
    v-if="visible"
    :disabled="!allowed"
    :title="allowed ? undefined : 'UI permission denied'"
    :type="buttonType"
    @click="click"
  >
    <slot />
  </ElButton>
</template>
