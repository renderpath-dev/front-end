<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const matchedLabels = computed(() =>
  route.matched.map((record) =>
    record.name ? String(record.name) : record.path,
  ),
);
</script>

<template>
  <article class="concept-panel">
    <p class="topic">SPA routing state</p>
    <h3>URL to component matching</h3>
    <dl>
      <div>
        <dt>Current URL</dt>
        <dd>{{ route.fullPath }}</dd>
      </div>
      <div>
        <dt>Matched records</dt>
        <dd>{{ matchedLabels.join(" → ") || "No named record" }}</dd>
      </div>
      <div>
        <dt>Rendered title</dt>
        <dd>{{ route.meta.title }}</dd>
      </div>
    </dl>
    <p>
      The browser URL selects route records. RouterView renders the
      components attached to those records without creating a new Vue app.
    </p>
  </article>
</template>

<style scoped>
.concept-panel {
  padding: 1rem;
  border: 1px solid #cdd9e5;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

dl {
  display: grid;
  gap: 0.5rem;
}

dl div {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 0.5rem;
}

dt {
  font-weight: 800;
}

dd {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
