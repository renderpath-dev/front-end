<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";
import { routeNames } from "../router/routeNames";

const knownUserIds = new Set(["u-100", "u-200", "u-300"]);
const route = useRoute(routeNames.userDetail);
const router = useRouter();
const visibleUserId = ref(route.params.userId);
const hasUnsavedChanges = ref(false);
const updateMessage = ref("Initial route instance.");

const activeTab = computed(() => {
  const tab = route.query.tab;
  return typeof tab === "string" ? tab : "profile";
});

watch(
  () => route.params.userId,
  (userId) => {
    visibleUserId.value = userId;
  },
);

onBeforeRouteUpdate((to) => {
  const userId = to.params.userId;

  if (
    typeof userId !== "string" ||
    !knownUserIds.has(userId)
  ) {
    return {
      name: routeNames.notFound,
      params: {
        pathMatch: to.path
          .split("/")
          .filter((segment) => segment.length > 0),
      },
    };
  }

  updateMessage.value = `Reused component for ${userId}.`;
  hasUnsavedChanges.value = false;
  return true;
});

onBeforeRouteLeave(() => {
  if (!hasUnsavedChanges.value) {
    return true;
  }

  return window.confirm(
    "Discard the local unsaved changes and leave this route?",
  );
});

async function openUser(userId: string): Promise<void> {
  await router.push({
    name: routeNames.userDetail,
    params: {
      userId,
    },
    query: {
      ...route.query,
      tab: activeTab.value,
    },
  });
}

async function selectTab(tab: string): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      tab,
    },
  });
}
</script>

<template>
  <section class="user-detail-view">
    <p class="topic">Reused dynamic route component</p>
    <h2>User {{ visibleUserId }}</h2>
    <p>Active query tab: {{ activeTab }}</p>
    <p>{{ updateMessage }}</p>

    <div class="actions">
      <button type="button" @click="openUser('u-100')">u-100</button>
      <button type="button" @click="openUser('u-200')">u-200</button>
      <button type="button" @click="openUser('u-300')">u-300</button>
    </div>

    <div class="actions">
      <button type="button" @click="selectTab('profile')">
        Profile tab
      </button>
      <button type="button" @click="selectTab('security')">
        Security tab
      </button>
    </div>

    <label>
      <input v-model="hasUnsavedChanges" type="checkbox" />
      Block route leave with a local unsaved-change guard
    </label>
  </section>
</template>

<style scoped>
.user-detail-view {
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  background: #f7fbff;
  cursor: pointer;
}

label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 700;
}
</style>
