<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { uiLibraryComparisons } from "../ui/uiLibraryComparison";

const route = useRoute();
const authStore = useAuthStore();
const permissionStore = usePermissionStore();
const { role } = storeToRefs(authStore);
const querySummary = computed(() => JSON.stringify(route.query));
</script>

<template>
  <div class="dashboard-grid">
    <ElCard shadow="never">
      <ElStatistic title="Local users" :value="4" />
    </ElCard>
    <ElCard shadow="never">
      <ElStatistic title="Local products" :value="3" />
    </ElCard>
    <ElCard shadow="never">
      <ElStatistic title="Local orders" :value="3" />
    </ElCard>
    <ElCard class="summary-card" header="Current state owners" shadow="never">
      <ElDescriptions :column="1" border>
        <ElDescriptionsItem label="Pinia role">
          {{ role ?? "guest" }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Permission summary">
          {{ permissionStore.visiblePermissionSummary }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Router query">
          {{ querySummary }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
    <ElCard class="comparison-card" header="UI library decision record" shadow="never">
      <ElTable :data="uiLibraryComparisons" size="small">
        <ElTableColumn prop="library" label="Library" width="150" />
        <ElTableColumn prop="strongestFit" label="Strongest fit" min-width="240" />
        <ElTableColumn prop="tradeoff" label="Tradeoff" min-width="240" />
        <ElTableColumn label="Installed" width="100">
          <template #default="{ row }">
            {{ row.installed ? "Yes" : "No" }}
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.comparison-card {
  grid-column: 1 / -1;
}

.summary-card {
  grid-column: 1 / -1;
}

@media (max-width: 760px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
