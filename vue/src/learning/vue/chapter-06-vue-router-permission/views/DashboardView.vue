<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { currentUser } from "../router/authSession";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.dashboard);

const dashboardLinks = [
  {
    name: routeNames.users,
    label: "User management",
  },
  {
    name: routeNames.roles,
    label: "Role management",
  },
  {
    name: routeNames.orders,
    label: "Order management",
  },
] as const;
</script>

<template>
  <section class="dashboard-view">
    <p class="topic">Admin child route</p>
    <h2>{{ route.meta.title }}</h2>
    <p>
      Signed in as
      {{ currentUser?.displayName ?? "unknown user" }}
      ({{ currentUser?.role ?? "no role" }}).
    </p>
    <div class="card-grid">
      <RouterLink
        v-for="link in dashboardLinks"
        :key="link.name"
        :to="{ name: link.name }"
        class="route-card"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.dashboard-view {
  display: grid;
  gap: 0.8rem;
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.65rem;
}

.route-card {
  padding: 1rem;
  border: 1px solid #b8cbe0;
  border-radius: 0.65rem;
  background: #f8fbff;
  color: #175cd3;
  font-weight: 800;
  text-decoration: none;
}
</style>
