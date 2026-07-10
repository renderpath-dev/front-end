<script setup lang="ts">
import { computed, inject } from "vue";
import { toastKey } from "./theme-key";

const toastContext = inject(toastKey);
const visibleToasts = computed(() => toastContext?.toasts.value ?? []);

function dismissToast(toastId: number): void {
  toastContext?.dismissToast(toastId);
}
</script>

<template>
  <aside
    v-if="visibleToasts.length > 0"
    class="toast-viewport"
    aria-live="polite"
    aria-label="Notifications"
  >
    <article v-for="toast in visibleToasts" :key="toast.id" class="toast">
      <span>{{ toast.message }}</span>
      <button
        type="button"
        :aria-label="`Dismiss ${toast.message}`"
        @click="dismissToast(toast.id)"
      >
        Dismiss
      </button>
    </article>
  </aside>
</template>

<style scoped>
.toast-viewport {
  position: fixed;
  z-index: 30;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  width: min(360px, calc(100vw - 2rem));
  gap: 0.5rem;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem;
  border: 1px solid #244f91;
  border-radius: 0.6rem;
  background: #eef4ff;
  color: #173965;
  box-shadow: 0 0.7rem 1.6rem rgba(23, 57, 101, 0.18);
}

.toast button {
  border: 0;
  background: transparent;
  color: inherit;
  font-weight: 800;
  cursor: pointer;
}
</style>
