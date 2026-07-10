<script setup lang="ts">
import { ref } from "vue";
import {
  clearTimelineEvents,
  readTimelineEvents,
  type RequestTimelineEvent,
} from "../api/mockBackendScenarios";

const events = ref<ReadonlyArray<RequestTimelineEvent>>([]);

function refresh(): void {
  events.value = readTimelineEvents().slice(-20).reverse();
}

function clear(): void {
  clearTimelineEvents();
  refresh();
}
</script>

<template>
  <ElCard header="Request timeline" shadow="never">
    <div class="actions">
      <ElButton type="primary" @click="refresh">Refresh timeline</ElButton>
      <ElButton @click="clear">Clear</ElButton>
    </div>
    <ElTimeline>
      <ElTimelineItem
        v-for="event in events"
        :key="event.id"
        :timestamp="`${event.type} / ${event.requestId}`"
      >
        {{ event.detail }}
      </ElTimelineItem>
    </ElTimeline>
  </ElCard>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
