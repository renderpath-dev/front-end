<script setup lang="ts">
import { RouterLink } from "vue-router";
import { routeNames } from "../router/routeNames";
</script>

<template>
  <article class="comparison-panel">
    <p class="topic">Navigation boundary</p>
    <h3>RouterLink versus anchor</h3>
    <div class="link-row">
      <RouterLink :to="{ name: routeNames.dashboard }">
        RouterLink to dashboard
      </RouterLink>
      <a href="/router/dashboard">
        Anchor to dashboard
      </a>
    </div>
    <p>
      RouterLink resolves the target and asks the router to navigate.
      The anchor can start a new document request.
    </p>
  </article>
</template>

<style scoped>
.comparison-panel {
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
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

.link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

a {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  color: #175cd3;
}
</style>
