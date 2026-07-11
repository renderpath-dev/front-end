<script setup lang="ts">
import type { TestBoundaryItem } from "../../../shared/types/test";

const testItems: ReadonlyArray<TestBoundaryItem> = [
  {
    name: "Auth session tests",
    status: "passing",
    evidence: "Validate login payloads and safe session projection.",
  },
  {
    name: "Protected route tests",
    status: "passing",
    evidence: "Distinguish missing session and wrong role boundaries.",
  },
  {
    name: "Content page smoke tests",
    status: "passing",
    evidence: "Check content page ownership and route contracts.",
  },
];

useSeoMeta({
  title: "Testing",
  description: "Nuxt-specific testing boundary map.",
});
</script>

<template>
  <TestResultExplainer :items="testItems" />
</template>
