<script setup lang="ts">
import { RouterLink } from "vue-router";
import { routeNames } from "../router/routeNames";
</script>

<template>
  <article class="home-panel">
    <p class="topic">Route scenarios</p>
    <h3>Start a navigation</h3>
    <div class="links">
      <RouterLink :to="{ name: routeNames.login }">
        Login
      </RouterLink>
      <RouterLink :to="{ name: routeNames.dashboard }">
        Dashboard
      </RouterLink>
      <RouterLink
        :to="{
          name: routeNames.userDetail,
          params: { userId: 'u-200' },
          query: { tab: 'security' },
        }"
      >
        User u-200
      </RouterLink>
      <RouterLink
        :to="{
          name: routeNames.orders,
          query: { status: 'pending', page: '1' },
        }"
      >
        Pending orders
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.home-panel {
  padding: 1rem;
  border: 1px solid #c4d4e3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

a {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  color: #175cd3;
  font-weight: 700;
}
</style>
