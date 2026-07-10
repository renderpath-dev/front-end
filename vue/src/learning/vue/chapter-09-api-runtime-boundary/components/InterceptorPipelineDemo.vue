<script setup lang="ts">
import { ref } from "vue";
import {
  readTimelineEvents,
  type RequestTimelineEvent,
} from "../api/mockBackendScenarios";
import { getDemoSessionHeaders } from "../api/apiSession";
import { listProducts } from "../services/productApi";

const events = ref<ReadonlyArray<RequestTimelineEvent>>([]);
const sessionHeaders = getDemoSessionHeaders();

async function runPipeline(): Promise<void> {
  await listProducts({
    keyword: "",
    page: 1,
    pageSize: 2,
    sort: "id",
    order: "ascending",
  });
  events.value = readTimelineEvents().slice(-6);
}
</script>

<template>
  <ElCard header="Interceptor pipeline" shadow="never">
    <p>
      Request interceptors attach metadata before the adapter. Response
      interceptors add duration before service-level schema validation.
    </p>
    <ElTag>{{ sessionHeaders["X-Demo-Role"] }}</ElTag>
    <ElButton type="primary" @click="runPipeline">Run pipeline</ElButton>
    <ElTimeline class="timeline">
      <ElTimelineItem
        v-for="event in events"
        :key="event.id"
        :timestamp="event.requestId"
      >
        {{ event.type }} — {{ event.detail }}
      </ElTimelineItem>
    </ElTimeline>
  </ElCard>
</template>

<style scoped>
p {
  line-height: 1.6;
}

.timeline {
  margin-top: 1rem;
}
</style>
