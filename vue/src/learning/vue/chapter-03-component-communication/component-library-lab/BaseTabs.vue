<script setup lang="ts">
import { computed } from "vue";

type TabItem = {
  id: string;
  label: string;
};

type Props = {
  tabs: TabItem[];
};

const props = defineProps<Props>();
const activeTabId = defineModel<string>({ required: true });

const activeTab = computed(
  () => props.tabs.find((tab) => tab.id === activeTabId.value) ?? null,
);
</script>

<template>
  <section class="tabs">
    <div class="tab-list" role="tablist" aria-label="Component library topics">
      <button
        v-for="tab in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTabId === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :class="{ active: activeTabId === tab.id }"
        @click="activeTabId = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-if="activeTab"
      :id="`panel-${activeTab.id}`"
      class="tab-panel"
      role="tabpanel"
      :aria-labelledby="`tab-${activeTab.id}`"
    >
      <slot name="panel" :active-tab="activeTab">
        {{ activeTab.label }}
      </slot>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  overflow: hidden;
  border: 1px solid #d2d9e5;
  border-radius: 0.75rem;
}

.tab-list {
  display: flex;
  gap: 0.25rem;
  padding: 0.4rem;
  background: #edf2fa;
}

.tab-list button {
  padding: 0.5rem 0.7rem;
  border: 0;
  border-radius: 0.4rem;
  background: transparent;
  color: #3b4f72;
  cursor: pointer;
}

.tab-list button.active {
  background: #ffffff;
  color: #234f91;
  font-weight: 800;
}

.tab-panel {
  padding: 1rem;
}
</style>
