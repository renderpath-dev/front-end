<script setup lang="ts">
import { storeToRefs } from "pinia";
import PiniaAdminDashboard from "./PiniaAdminDashboard.vue";
import PiniaAdminHeader from "./PiniaAdminHeader.vue";
import PiniaAdminSidebar from "./PiniaAdminSidebar.vue";
import PiniaCartPanel from "./PiniaCartPanel.vue";
import PiniaPreferencePanel from "./PiniaPreferencePanel.vue";
import PiniaStoreTestPanel from "./PiniaStoreTestPanel.vue";
import { usePreferenceStore } from "../stores/preferenceStore";
import { useThemeStore } from "../stores/themeStore";

const preferenceStore = usePreferenceStore();
const themeStore = useThemeStore();
const { compactLayout } = storeToRefs(preferenceStore);
const { themeClass } = storeToRefs(themeStore);
</script>

<template>
  <section
    class="admin-lab"
    :class="[themeClass, { compact: compactLayout }]"
  >
    <PiniaAdminHeader />
    <div class="admin-body">
      <PiniaAdminSidebar />
      <div class="admin-content">
        <PiniaAdminDashboard />
        <div class="feature-grid">
          <PiniaCartPanel />
          <PiniaPreferencePanel />
          <PiniaStoreTestPanel />
        </div>
      </div>
    </div>
    <footer>
      Pinia controls client state and presentation. Vue Router owns the URL.
      The backend remains the authorization authority.
    </footer>
  </section>
</template>

<style scoped>
.admin-lab {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #0f766e;
  border-radius: 1.1rem;
  background: #ecfdf5;
}

.admin-lab.theme-dark {
  color: #e2e8f0;
  background: #020617;
}

.admin-lab.compact {
  gap: 0.55rem;
  padding: 0.6rem;
}

.admin-body {
  display: flex;
  gap: 1rem;
}

.admin-content {
  display: grid;
  flex: 1;
  gap: 1rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
}

footer {
  padding: 0.8rem;
  border-radius: 0.6rem;
  color: #134e4a;
  background: #ccfbf1;
}

@media (max-width: 760px) {
  .admin-body {
    flex-direction: column;
  }
}
</style>
