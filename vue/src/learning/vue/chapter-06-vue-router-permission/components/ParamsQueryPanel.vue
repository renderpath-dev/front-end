<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routeNames } from "../router/routeNames";

const route = useRoute();
const router = useRouter();

const currentUserId = computed(() => {
  const value =
    "userId" in route.params
      ? route.params.userId
      : undefined;

  return typeof value === "string" ? value : "none";
});

const currentTab = computed(() => {
  const value = route.query.tab;
  return typeof value === "string" ? value : "none";
});

async function openKnownUser(): Promise<void> {
  await router.push({
    name: routeNames.userDetail,
    params: {
      userId: "u-100",
    },
    query: {
      tab: "profile",
    },
  });
}

async function replaceTab(): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      tab: "security",
    },
  });
}
</script>

<template>
  <article class="params-panel">
    <p class="topic">URL-owned state</p>
    <h3>Params and query</h3>
    <p>Param userId: {{ currentUserId }}</p>
    <p>Query tab: {{ currentTab }}</p>
    <div class="actions">
      <button type="button" @click="openKnownUser">
        Push user u-100
      </button>
      <button type="button" @click="replaceTab">
        Replace tab query
      </button>
    </div>
  </article>
</template>

<style scoped>
.params-panel {
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  background: #f7fbff;
  color: #184d77;
  cursor: pointer;
}
</style>
