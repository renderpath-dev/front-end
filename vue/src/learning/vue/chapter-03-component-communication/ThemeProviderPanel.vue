<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import ThemeConsumerPanel from "./ThemeConsumerPanel.vue";
import {
  themeKey,
  type ThemeName,
} from "./component-library-lab/theme-key";

const theme = ref<ThemeName>("light");

function toggleTheme(): void {
  theme.value = theme.value === "light" ? "dark" : "light";
}

provide(themeKey, {
  theme: readonly(theme),
  toggleTheme,
});
</script>

<template>
  <section class="provider">
    <p>Provider-owned theme: <strong>{{ theme }}</strong></p>
    <ThemeConsumerPanel />
  </section>
</template>

<style scoped>
.provider {
  display: grid;
  gap: 0.75rem;
  padding: 0.85rem;
  border: 1px dashed #88aa98;
  border-radius: 0.7rem;
}

.provider > p {
  margin: 0;
}
</style>
