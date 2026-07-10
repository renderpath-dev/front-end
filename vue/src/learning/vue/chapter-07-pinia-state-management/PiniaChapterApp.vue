<script setup lang="ts">
import AuthStoreDemo from "./components/AuthStoreDemo.vue";
import CartStoreDemo from "./components/CartStoreDemo.vue";
import PatchResetDemo from "./components/PatchResetDemo.vue";
import PermissionStoreDemo from "./components/PermissionStoreDemo.vue";
import PiniaPluginDemo from "./components/PiniaPluginDemo.vue";
import PreferenceStoreDemo from "./components/PreferenceStoreDemo.vue";
import SelectionStoreDemo from "./components/SelectionStoreDemo.vue";
import SsrSafeStateDemo from "./components/SsrSafeStateDemo.vue";
import StateClassificationPanel from "./components/StateClassificationPanel.vue";
import StoreBoundaryPanel from "./components/StoreBoundaryPanel.vue";
import StoreOutsideComponentDemo from "./components/StoreOutsideComponentDemo.vue";
import StoreToRefsDemo from "./components/StoreToRefsDemo.vue";
import ThemeStoreDemo from "./components/ThemeStoreDemo.vue";
import VuePiniaAdminStateLab from "./pinia-lab/VuePiniaAdminStateLab.vue";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-07-title">
    <header class="chapter-hero">
      <p class="eyebrow">Vue Chapter 07</p>
      <h2 id="chapter-07-title">
        Pinia State Management and Store Boundaries
      </h2>
      <p>
        Classify state before globalizing it, compose typed stores, migrate
        Router guards to one Pinia root, persist an allowlist, and unit-test
        store behavior.
      </p>
    </header>

    <StoreBoundaryPanel />
    <StateClassificationPanel />

    <div class="demo-grid">
      <AuthStoreDemo />
      <PermissionStoreDemo />
      <ThemeStoreDemo />
      <PreferenceStoreDemo />
      <CartStoreDemo />
      <SelectionStoreDemo />
      <StoreToRefsDemo />
      <PatchResetDemo />
      <PiniaPluginDemo />
      <StoreOutsideComponentDemo />
      <SsrSafeStateDemo />
    </div>

    <VuePiniaAdminStateLab />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #99f6e4;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(204, 251, 241, 0.96), rgba(238, 242, 255, 0.96));
}

.eyebrow {
  margin: 0;
  color: #0f766e;
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
  max-width: 780px;
  line-height: 1.65;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}
</style>
