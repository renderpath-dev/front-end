<script setup lang="ts">
import type { PropType } from "vue";

type ButtonTone = "primary" | "neutral";

type ActivationPayload = {
  source: string;
};

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  tone: {
    type: String as PropType<ButtonTone>,
    default: "primary",
    validator: (value: string): boolean =>
      value === "primary" || value === "neutral",
  },
});

const emit = defineEmits<{
  activate: [payload: ActivationPayload];
}>();

function activate(): void {
  emit("activate", {
    source: props.label,
  });
}
</script>

<template>
  <button
    type="button"
    class="fallthrough-button"
    :class="`tone-${tone}`"
    @click="activate"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.fallthrough-button {
  padding: 0.6rem 0.85rem;
  border: 1px solid #18794e;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
}

.tone-primary {
  background: #18794e;
  color: #ffffff;
}

.tone-neutral {
  background: #ffffff;
  color: #284d3b;
}
</style>
