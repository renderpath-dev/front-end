<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";

const cartStore = useCartStore();
const themeStore = useThemeStore();
const mutationLabel = ref("No patch applied");

function applyObjectPatch(): void {
  cartStore.$patch({
    items: [{ productId: "keyboard", quantity: 2 }],
    updatedAt: new Date().toISOString(),
  });
  mutationLabel.value = "Object patch replaced two state fields";
}

function applyFunctionPatch(): void {
  cartStore.$patch((state) => {
    state.items.push({ productId: "mouse", quantity: 1 });
    state.updatedAt = new Date().toISOString();
  });
  mutationLabel.value = "Function patch grouped collection changes";
}

function resetOptionStore(): void {
  themeStore.$reset();
  mutationLabel.value = "Option Store reset from its state factory";
}
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Grouped mutations</p>
    <h2>$patch and $reset</h2>
    <p>{{ mutationLabel }}</p>
    <div class="actions">
      <button type="button" @click="applyObjectPatch">Object patch</button>
      <button type="button" @click="applyFunctionPatch">Function patch</button>
      <button type="button" @click="resetOptionStore">Reset theme</button>
    </div>
    <small>
      Option Stores receive $reset automatically. Setup Stores need an explicit
      reset action when reset behavior is required.
    </small>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #fdba74;
  border-radius: 1rem;
  background: #fff7ed;
}

.eyebrow {
  margin: 0;
  color: #c2410c;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #ea580c;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
