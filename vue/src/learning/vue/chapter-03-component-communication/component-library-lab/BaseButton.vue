<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  type: "button",
});

const emit = defineEmits<{
  activate: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :class="['base-button', `base-button--${variant}`]"
    :disabled="disabled"
    @click="emit('activate', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.55rem 0.8rem;
  border: 1px solid #315a9e;
  border-radius: 0.5rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.base-button--primary {
  background: #315a9e;
  color: #ffffff;
}

.base-button--secondary {
  background: #ffffff;
  color: #315a9e;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
