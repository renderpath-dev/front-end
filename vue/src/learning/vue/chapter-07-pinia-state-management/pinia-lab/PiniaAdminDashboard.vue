<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { usePermissionStore } from "../stores/permissionStore";
import { useSelectionStore } from "../stores/selectionStore";

const authStore = useAuthStore();
const permissionStore = usePermissionStore();
const cartStore = useCartStore();
const selectionStore = useSelectionStore();

const cards = computed(() => [
  {
    label: "Session",
    value: authStore.isSignedIn ? authStore.role ?? "unknown" : "signed out",
  },
  {
    label: "Cart items",
    value: String(cartStore.itemCount),
  },
  {
    label: "Selected rows",
    value: String(selectionStore.selectedIds.length),
  },
  {
    label: "Roles route",
    value: permissionStore.hasPermission(["roles:view"])
      ? "visible"
      : "hidden",
  },
]);
</script>

<template>
  <section class="dashboard">
    <h3>Global client state dashboard</h3>
    <div class="card-grid">
      <article v-for="card in cards" :key="card.label">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </article>
    </div>
    <p>
      Remote dashboard metrics are intentionally absent. They belong to a
      future API cache and invalidation policy.
    </p>
  </section>
</template>

<style scoped>
.dashboard {
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.9rem;
  background: #ffffff;
}

h3 {
  margin-top: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.65rem;
}

article {
  display: grid;
  gap: 0.35rem;
  padding: 0.75rem;
  border-radius: 0.65rem;
  background: #f1f5f9;
}

strong {
  color: #0f766e;
  font-size: 1.2rem;
}
</style>
