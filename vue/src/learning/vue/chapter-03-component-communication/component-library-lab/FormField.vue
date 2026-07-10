<script setup lang="ts">
type Props = {
  id: string;
  label: string;
  error?: string;
};

defineProps<Props>();
</script>

<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <slot />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-else class="hint">
      <slot name="hint" />
    </p>
  </div>
</template>

<style scoped>
.form-field {
  display: grid;
  gap: 0.4rem;
}

label {
  font-weight: 800;
}

.hint,
.error {
  min-height: 1.2em;
  margin: 0;
  font-size: 0.85rem;
}

.hint {
  color: #64748b;
}

.error {
  color: #b42318;
}
</style>
