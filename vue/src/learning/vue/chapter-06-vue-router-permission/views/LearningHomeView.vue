<script setup lang="ts">
import { RouterLink } from "vue-router";
import { routeNames } from "../router/routeNames";

const routerLabLinks = [
  {
    label: "Login",
    to: {
      name: routeNames.login,
    },
  },
  {
    label: "Dashboard",
    to: {
      name: routeNames.dashboard,
    },
  },
  {
    label: "Orders",
    to: {
      name: routeNames.orders,
    },
  },
  {
    label: "User u-100",
    to: {
      name: routeNames.userDetail,
      params: {
        userId: "u-100",
      },
    },
  },
] as const;
</script>

<template>
  <section class="learning-home-view">
    <p class="topic">Single-page learning home</p>
    <h2>Vue Learning Home</h2>
    <p>
      All learning chapters remain on this page. Use these links to test
      the contained Chapter 06 Router lab.
    </p>
    <nav aria-label="Router lab routes">
      <RouterLink
        v-for="link in routerLabLinks"
        :key="link.label"
        :to="link.to"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </section>
</template>

<style scoped>
.learning-home-view {
  display: grid;
  gap: 0.75rem;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

nav {
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
