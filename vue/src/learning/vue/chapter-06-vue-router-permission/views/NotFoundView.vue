<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.notFound);
</script>

<template>
  <section class="status-view">
    <p class="status-code">404</p>
    <h2>Router lab route not found</h2>
    <p>Unmatched URL: {{ route.fullPath }}</p>
    <RouterLink :to="{ name: routeNames.dashboard }">
      Return to dashboard
    </RouterLink>
  </section>
</template>

<style scoped>
.status-view {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px solid #fbd38d;
  border-radius: 0.7rem;
  background: #fffaf0;
}

.status-code {
  margin: 0;
  color: #9c4a00;
  font-size: 2.5rem;
  font-weight: 900;
}

h2,
p {
  margin: 0;
}

a {
  color: #175cd3;
  font-weight: 700;
}
</style>
