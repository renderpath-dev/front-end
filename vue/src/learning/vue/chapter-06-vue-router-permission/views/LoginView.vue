<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  currentUser,
  signInAs,
  signOut,
} from "../router/authSession";
import type { RouteRole } from "../router/routeMeta";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.login);
const router = useRouter();

function readSafeRedirect(): string | null {
  const redirect = route.query.redirect;

  if (
    typeof redirect === "string" &&
    redirect.startsWith("/router/") &&
    redirect !== "/router/login"
  ) {
    return redirect;
  }

  return null;
}

async function signIn(role: RouteRole): Promise<void> {
  signInAs(role);

  const redirect = readSafeRedirect();

  if (redirect) {
    await router.replace(redirect);
    return;
  }

  await router.replace({
    name: routeNames.dashboard,
  });
}
</script>

<template>
  <section class="login-view">
    <p class="topic">Public route</p>
    <h2>Router Lab Login</h2>
    <p>
      Current session:
      {{ currentUser?.displayName ?? "Signed out" }}
    </p>
    <p v-if="route.query.redirect">
      Intended destination: {{ route.query.redirect }}
    </p>
    <div class="actions">
      <button type="button" @click="signIn('admin')">
        Sign in as admin
      </button>
      <button type="button" @click="signIn('manager')">
        Sign in as manager
      </button>
      <button type="button" @click="signIn('operator')">
        Sign in as operator
      </button>
      <button
        v-if="currentUser"
        type="button"
        class="secondary"
        @click="signOut"
      >
        Sign out
      </button>
    </div>
    <p class="boundary">
      This deterministic session is local to the learning module. It does
      not authenticate a backend request.
    </p>
  </section>
</template>

<style scoped>
.login-view {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
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

h2,
p {
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #175cd3;
  border-radius: 0.45rem;
  background: #175cd3;
  color: #ffffff;
  cursor: pointer;
}

button.secondary {
  background: #ffffff;
  color: #175cd3;
}

.boundary {
  color: #7a2e0e;
  font-weight: 700;
}
</style>
