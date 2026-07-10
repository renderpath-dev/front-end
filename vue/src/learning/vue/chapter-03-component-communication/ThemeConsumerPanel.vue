<script setup lang="ts">
import { computed, inject } from "vue";
import { themeKey } from "./component-library-lab/theme-key";

const themeContext = inject(themeKey);
const themeName = computed(() => themeContext?.theme.value ?? "unavailable");

function requestThemeChange(): void {
  themeContext?.toggleTheme();
}
</script>

<template>
  <section class="consumer" :data-theme="themeName">
    <p>Injected theme: <strong>{{ themeName }}</strong></p>
    <button
      type="button"
      :disabled="!themeContext"
      @click="requestThemeChange"
    >
      Toggle through provided action
    </button>
    <p v-if="!themeContext" class="error">
      Theme provider is unavailable.
    </p>
  </section>
</template>

<style scoped>
.consumer {
  padding: 0.85rem;
  border-radius: 0.65rem;
  background: #f7faf8;
}

.consumer[data-theme="dark"] {
  background: #26342d;
  color: #f4faf6;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #739783;
  border-radius: 0.45rem;
  background: #ffffff;
  color: #245a3e;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  opacity: 0.6;
}

.error {
  color: #a33c3c;
}
</style>
