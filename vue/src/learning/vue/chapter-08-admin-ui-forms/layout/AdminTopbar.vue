<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { useSidebarStore } from "../../chapter-07-pinia-state-management/stores/sidebarStore";
import LocaleSwitcher from "../theme/LocaleSwitcher.vue";
import ThemeSwitcher from "../theme/ThemeSwitcher.vue";

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const { displayName } = storeToRefs(authStore);
</script>

<template>
  <div class="topbar">
    <div class="topbar-group">
      <ElButton @click="sidebarStore.toggleCollapsed()">Toggle sidebar</ElButton>
      <strong>{{ displayName }}</strong>
    </div>
    <div class="topbar-group">
      <LocaleSwitcher />
      <ThemeSwitcher />
      <ElButton v-if="authStore.isSignedIn" @click="authStore.signOut()">
        Sign out
      </ElButton>
    </div>
  </div>
</template>

<style scoped>
.topbar,
.topbar-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.topbar {
  justify-content: space-between;
}

.topbar-group {
  flex-wrap: wrap;
}
</style>
