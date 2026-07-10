<script setup lang="ts">
import VueApiContractLab from "./api-contract-lab/VueApiContractLab.vue";
import ApiBoundaryPanel from "./components/ApiBoundaryPanel.vue";
import ApiClientDemo from "./components/ApiClientDemo.vue";
import AuthSessionBoundaryDemo from "./components/AuthSessionBoundaryDemo.vue";
import ErrorNormalizationDemo from "./components/ErrorNormalizationDemo.vue";
import FormPayloadSubmitDemo from "./components/FormPayloadSubmitDemo.vue";
import InterceptorPipelineDemo from "./components/InterceptorPipelineDemo.vue";
import PaginationResponseDemo from "./components/PaginationResponseDemo.vue";
import RequestCancellationDemo from "./components/RequestCancellationDemo.vue";
import RetryTimeoutDemo from "./components/RetryTimeoutDemo.vue";
import ServerStateOwnershipPanel from "./components/ServerStateOwnershipPanel.vue";
import StatusCodeHandlingDemo from "./components/StatusCodeHandlingDemo.vue";
import UnknownResponseDemo from "./components/UnknownResponseDemo.vue";
import ZodValidationPanel from "./components/ZodValidationPanel.vue";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-09-title">
    <header class="chapter-hero">
      <p class="eyebrow">Vue Chapter 09</p>
      <h2 id="chapter-09-title">
        API, Runtime Validation, and Frontend/Backend Boundaries
      </h2>
      <p>
        Trace requests from Vue events through composables, endpoint services,
        one Axios instance, interceptors, a deterministic local adapter, Zod
        validation, normalized errors, and UI state.
      </p>
    </header>

    <div class="panel-grid">
      <ApiBoundaryPanel />
      <UnknownResponseDemo />
      <ApiClientDemo />
      <InterceptorPipelineDemo />
      <ErrorNormalizationDemo />
      <StatusCodeHandlingDemo />
      <PaginationResponseDemo />
      <FormPayloadSubmitDemo />
      <RequestCancellationDemo />
      <RetryTimeoutDemo />
      <AuthSessionBoundaryDemo />
      <ServerStateOwnershipPanel />
      <ZodValidationPanel />
    </div>

    <VueApiContractLab />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #c4b5fd;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(245, 243, 255, 0.98), rgba(239, 246, 255, 0.98));
}

.eyebrow {
  margin: 0;
  color: #6d28d9;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin: 0.45rem 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.chapter-hero p:last-child {
  max-width: 860px;
  line-height: 1.65;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
}
</style>
