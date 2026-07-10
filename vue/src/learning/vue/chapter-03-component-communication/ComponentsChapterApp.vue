<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import AsyncComponentDemo from "./AsyncComponentDemo.vue";
import ComponentLibraryLab from "./component-library-lab/ComponentLibraryLab.vue";
import EditableTitle from "./EditableTitle.vue";
import FallthroughAttributeButton from "./FallthroughAttributeButton.vue";
import LifecycleHookPanel from "./LifecycleHookPanel.vue";
import ModalWithSlots from "./ModalWithSlots.vue";
import ProductList from "./ProductList.vue";
import ProvideInjectTheme from "./ProvideInjectTheme.vue";
import ScopedSlotTable from "./ScopedSlotTable.vue";
import TemplateRefFocus from "./TemplateRefFocus.vue";

const editableTitle = ref("Parent-owned chapter title");
const showSlotModal = ref(false);
const showLifecyclePanel = ref(true);
const fallthroughEvents = ref<string[]>([]);
const focusDemo =
  useTemplateRef<InstanceType<typeof TemplateRefFocus>>("focus-demo");

function recordFallthroughEvent(eventName: string): void {
  fallthroughEvents.value.push(eventName);
}

function focusChildInput(): void {
  focusDemo.value?.focusInput();
}
</script>

<template>
  <section class="chapter" aria-labelledby="chapter-03-title">
    <header class="chapter-header">
      <p class="eyebrow">Chapter 03</p>
      <h2 id="chapter-03-title">
        Component Communication and Component Boundary
      </h2>
      <p>
        Trace source ownership and values across props, emits, models, slots,
        injection, attributes, refs, lifecycle hooks, and lazy wrappers.
      </p>
    </header>

    <ProductList />

    <div class="demo-grid">
      <EditableTitle v-model="editableTitle" />

      <article class="practice-card">
        <p class="topic">Named slots</p>
        <h3>Modal Slot Owner</h3>
        <p>Parent value used by slot content: {{ editableTitle }}</p>
        <button type="button" @click="showSlotModal = true">
          Open slot modal
        </button>
      </article>

      <ScopedSlotTable>
        <template #row="{ row, index }">
          <strong>{{ index + 1 }}. {{ row.concept }}</strong>
          <span>{{ row.direction }} | owner: {{ row.owner }}</span>
        </template>
      </ScopedSlotTable>

      <ProvideInjectTheme />

      <div class="focus-group">
        <TemplateRefFocus ref="focus-demo" />
        <button type="button" @click="focusChildInput">
          Focus through exposed component method
        </button>
      </div>

      <article class="practice-card">
        <p class="topic">Fallthrough attributes</p>
        <h3>Single Root Button</h3>
        <FallthroughAttributeButton
          id="fallthrough-action"
          class="parent-accent"
          aria-label="Run fallthrough attribute example"
          label="Inspect inherited attributes"
          @activate="recordFallthroughEvent('declared activate event')"
          @click="recordFallthroughEvent('native click listener')"
        />
        <p>{{ fallthroughEvents.join(" | ") || "No event yet." }}</p>
      </article>

      <article class="practice-card">
        <p class="topic">Lifecycle owner</p>
        <h3>Mount and Unmount Control</h3>
        <button
          type="button"
          @click="showLifecyclePanel = !showLifecyclePanel"
        >
          {{ showLifecyclePanel ? "Unmount panel" : "Mount panel" }}
        </button>
        <LifecycleHookPanel v-if="showLifecyclePanel" />
      </article>

      <AsyncComponentDemo />
    </div>

    <ComponentLibraryLab />

    <ModalWithSlots :open="showSlotModal" @close="showSlotModal = false">
      <template #header>
        <h3 id="slot-modal-title">Parent-provided header</h3>
      </template>
      <p>
        This default slot can read the parent title:
        <strong>{{ editableTitle }}</strong>
      </p>
      <template #footer>
        <button type="button" @click="showSlotModal = false">
          Close from parent slot
        </button>
      </template>
    </ModalWithSlots>
  </section>
</template>

<style scoped>
.chapter {
  display: grid;
  gap: 1rem;
}

.chapter-header {
  padding: 1.5rem;
  border: 1px solid #cfd7e6;
  border-radius: 1rem;
  background: #f2f5fb;
}

.chapter-header h2 {
  margin: 0.35rem 0 0.6rem;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}

.chapter-header p:last-child {
  max-width: 820px;
  margin-bottom: 0;
  line-height: 1.7;
}

.eyebrow,
.topic {
  margin: 0;
  color: #4667a5;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
}

.practice-card {
  padding: 1.25rem;
  border: 1px solid #d5dbe7;
  border-radius: 0.9rem;
  background: #ffffff;
}

.practice-card h3 {
  margin: 0.35rem 0 0.75rem;
}

.practice-card button,
.focus-group > button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #728bb9;
  border-radius: 0.5rem;
  background: #f1f4fb;
  color: #334f85;
  cursor: pointer;
}

.focus-group {
  display: grid;
  gap: 0.5rem;
}

.focus-group > button {
  width: fit-content;
  margin-left: 1.25rem;
}

.parent-accent {
  outline: 3px solid rgba(70, 103, 165, 0.2);
}

@media (max-width: 500px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
