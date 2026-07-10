<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { currentUser } from "../router/authSession";
import { generateDynamicMenu } from "../router/dynamicMenu";
import { routeRecords } from "../router/routes";

const menuItems = computed(() =>
  generateDynamicMenu(routeRecords),
);
</script>

<template>
  <section class="menu-panel" aria-labelledby="dynamic-menu-title">
    <div class="menu-heading">
      <h3 id="dynamic-menu-title">Role-aware menu</h3>
      <span>{{ currentUser?.role ?? "signed out" }}</span>
    </div>
    <ul v-if="menuItems.length > 0">
      <li v-for="item in menuItems" :key="item.routeName">
        <RouterLink :to="{ name: item.routeName }">
          {{ item.label }}
        </RouterLink>
        <ul v-if="item.children.length > 0">
          <li
            v-for="child in item.children"
            :key="child.routeName"
          >
            <RouterLink :to="{ name: child.routeName }">
              {{ child.label }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>Sign in to generate menu items from route meta.</p>
  </section>
</template>

<style scoped>
.menu-panel {
  padding: 1rem;
  border: 1px solid #c4d4e3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

.menu-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

h3 {
  margin: 0;
}

ul {
  display: grid;
  gap: 0.4rem;
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
}

a {
  color: #175cd3;
  font-weight: 700;
}
</style>
