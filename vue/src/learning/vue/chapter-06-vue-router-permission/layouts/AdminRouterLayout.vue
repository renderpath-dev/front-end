<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import BreadcrumbTrail from "../components/BreadcrumbTrail.vue";
import DynamicMenuPanel from "../components/DynamicMenuPanel.vue";
import {
  currentUser,
  signOut,
} from "../router/authSession";
import { routeNames } from "../router/routeNames";

const router = useRouter();

async function endSession(): Promise<void> {
  signOut();
  await router.replace({
    name: routeNames.login,
  });
}
</script>

<template>
  <section class="admin-layout">
    <header class="admin-header">
      <div>
        <p class="topic">Nested admin layout</p>
        <strong>
          {{ currentUser?.displayName ?? "Signed out" }}
          · {{ currentUser?.role ?? "no role" }}
        </strong>
      </div>
      <div class="session-actions">
        <RouterLink :to="{ name: routeNames.login }">
          Switch account
        </RouterLink>
        <button type="button" @click="endSession">
          Sign out
        </button>
      </div>
    </header>

    <BreadcrumbTrail />

    <div class="admin-body">
      <aside>
        <DynamicMenuPanel />
      </aside>
      <main class="route-outlet">
        <RouterView />
      </main>
    </div>
  </section>
</template>

<style scoped>
.admin-layout {
  display: grid;
  gap: 1rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem;
  border-radius: 0.65rem;
  background: #eaf2fb;
}

.topic {
  margin: 0 0 0.25rem;
  color: #175cd3;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.session-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

.session-actions a {
  color: #175cd3;
  font-weight: 700;
}

button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #84a4c5;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

.admin-body {
  display: grid;
  grid-template-columns: minmax(210px, 0.32fr) minmax(0, 1fr);
  gap: 1rem;
}

.route-outlet {
  min-width: 0;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background: #ffffff;
}

@media (max-width: 760px) {
  .admin-header,
  .admin-body {
    grid-template-columns: 1fr;
  }

  .admin-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
