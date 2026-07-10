<script setup lang="ts">
import { RouterLink } from "vue-router";
import { routeNames } from "../router/routeNames";

const users = [
  {
    id: "u-100",
    name: "Casey Chen",
    team: "Platform",
  },
  {
    id: "u-200",
    name: "Jordan Lee",
    team: "Operations",
  },
  {
    id: "u-300",
    name: "Riley Morgan",
    team: "Support",
  },
] as const;
</script>

<template>
  <section class="user-list-view">
    <p class="topic">Named route and params</p>
    <h2>User Management</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        <div>
          <strong>{{ user.name }}</strong>
          <span>{{ user.team }}</span>
        </div>
        <RouterLink
          :to="{
            name: routeNames.userDetail,
            params: { userId: user.id },
            query: { tab: 'profile' },
          }"
        >
          Open profile
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.user-list-view {
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

h2 {
  margin: 0;
}

ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
}

li div {
  display: grid;
}

a {
  color: #175cd3;
  font-weight: 700;
}
</style>
