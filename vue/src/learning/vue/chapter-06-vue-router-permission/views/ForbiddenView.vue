<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.forbidden);
</script>

<template>
  <section class="status-view">
    <p class="status-code">403</p>
    <h2>Route access denied</h2>
    <p v-if="route.query.from">
      Blocked destination: {{ route.query.from }}
    </p>
    <div class="actions">
      <RouterLink :to="{ name: routeNames.dashboard }">
        Return to dashboard
      </RouterLink>
      <RouterLink :to="{ name: routeNames.login }">
        Switch account
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.status-view {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px solid #fecaca;
  border-radius: 0.7rem;
  background: #fff7f7;
}

.status-code {
  margin: 0;
  color: #b42318;
  font-size: 2.5rem;
  font-weight: 900;
}

h2,
p {
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

a {
  color: #175cd3;
  font-weight: 700;
}
</style>
