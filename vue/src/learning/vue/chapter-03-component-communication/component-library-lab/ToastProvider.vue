<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import ToastViewport from "./ToastViewport.vue";
import { toastKey, type ToastItem } from "./theme-key";

const toasts = ref<ToastItem[]>([]);
let nextToastId = 1;

function addToast(message: string): void {
  toasts.value.push({
    id: nextToastId,
    message,
  });
  nextToastId += 1;
}

function dismissToast(toastId: number): void {
  toasts.value = toasts.value.filter((toast) => toast.id !== toastId);
}

provide(toastKey, {
  toasts: readonly(toasts),
  addToast,
  dismissToast,
});

defineSlots<{
  default(props: { addToast: (message: string) => void }): unknown;
}>();
</script>

<template>
  <slot :add-toast="addToast" />
  <ToastViewport />
</template>

<style scoped>
:global(.toast-provider-action) {
  white-space: nowrap;
}
</style>
