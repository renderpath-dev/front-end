<script setup lang="ts">
import ApiBoundaryChecklist from "./ApiBoundaryChecklist.vue";
import OrderApiPanel from "./OrderApiPanel.vue";
import ProductApiPanel from "./ProductApiPanel.vue";
import ProductFormSubmitPanel from "./ProductFormSubmitPanel.vue";
import RequestTimelinePanel from "./RequestTimelinePanel.vue";
import UserApiPanel from "./UserApiPanel.vue";
</script>

<template>
  <section class="contract-lab" aria-labelledby="api-contract-lab-title">
    <header>
      <p class="eyebrow">Final Chapter 09 Project</p>
      <h3 id="api-contract-lab-title">Vue API Contract Lab</h3>
      <p>
        Exercise one replaceable API boundary from typed request config through
        local transport, unknown response validation, normalized result, and
        composable-owned UI state.
      </p>
    </header>
    <div class="lab-grid">
      <ProductApiPanel />
      <UserApiPanel />
      <OrderApiPanel />
      <ProductFormSubmitPanel />
      <RequestTimelinePanel />
      <ApiBoundaryChecklist />
    </div>
  </section>
</template>

<style scoped>
.contract-lab {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #c4b5fd;
  border-radius: 0.85rem;
  background: #f5f3ff;
}

header p {
  max-width: 820px;
  line-height: 1.6;
}

.eyebrow {
  margin: 0;
  color: #6d28d9;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.lab-grid {
  display: grid;
  gap: 1rem;
}
</style>
