<script setup lang="ts">
const boundaryRules = [
  {
    owner: "Component",
    example: "A dialog open flag used by one page",
    reason: "No other component needs the value",
  },
  {
    owner: "Form flow",
    example: "An unsaved product draft",
    reason: "The draft belongs to one editing workflow",
  },
  {
    owner: "Pinia",
    example: "Signed-in user, theme, shared cart",
    reason: "The state crosses component or page boundaries",
  },
  {
    owner: "Vue Router",
    example: "Filter, page, route params, query",
    reason: "The URL must remain the shareable source of truth",
  },
  {
    owner: "API cache",
    example: "Remote product list with stale and retry policy",
    reason: "Remote state needs cache and invalidation semantics",
  },
  {
    owner: "Backend",
    example: "Authorization for a protected operation",
    reason: "Client state cannot enforce server security",
  },
] as const;
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Store boundaries</p>
    <h2>Choose an owner before creating a store</h2>
    <div class="boundary-grid">
      <article v-for="rule in boundaryRules" :key="rule.owner">
        <strong>{{ rule.owner }}</strong>
        <span>{{ rule.example }}</span>
        <small>{{ rule.reason }}</small>
      </article>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  margin: 0;
  color: #047857;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0 1rem;
}

.boundary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.75rem;
}

article {
  display: grid;
  gap: 0.35rem;
  padding: 0.85rem;
  border-radius: 0.75rem;
  background: #f1f5f9;
}

small {
  color: #475569;
  line-height: 1.45;
}
</style>
