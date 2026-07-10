<script setup lang="ts">
import { ref } from "vue";
import type {
  Product,
  ProductForm,
  ProductId,
  ProductStatus,
} from "./contracts/productContract";
import DefineExposeDemo from "./components/DefineExposeDemo.vue";
import GenericSelect from "./components/GenericSelect.vue";
import InjectionProvider from "./components/InjectionProvider.vue";
import PropsWithDefaults from "./components/PropsWithDefaults.vue";
import TypedEmits from "./components/TypedEmits.vue";
import TypedProps from "./components/TypedProps.vue";
import TypedSlots from "./components/TypedSlots.vue";
import TypedTemplateRefDemo from "./components/TypedTemplateRefDemo.vue";
import TypedVModel from "./components/TypedVModel.vue";
import TypeRuntimeBoundaryDemo from "./components/TypeRuntimeBoundaryDemo.vue";
import VueTscBoundaryDemo from "./components/VueTscBoundaryDemo.vue";
import VueTsContractLab from "./ts-contract-lab/VueTsContractLab.vue";

type SelectOption = {
  id: string;
  label: string;
  description: string;
};

const products = [
  {
    id: "product-1",
    name: "Typed Vue Components",
    price: 52,
    status: "active",
    category: "course",
    tags: ["vue", "typescript"],
  },
  {
    id: "product-2",
    name: "Contract Inspector",
    price: 31,
    status: "draft",
    category: "tool",
    tags: ["tooling"],
  },
] satisfies Array<Product>;

const modelTitle = ref("Typed model title");
const modelStatus = ref<ProductStatus>("active");
const eventLog = ref("No typed event received.");

const selectOptions: Array<SelectOption> = [
  {
    id: "props",
    label: "Props contract",
    description: "Parent-to-child input",
  },
  {
    id: "emits",
    label: "Emits contract",
    description: "Child-to-parent intent",
  },
];
const selectedOption = ref<SelectOption | null>(selectOptions[0] ?? null);

function recordSelection(productId: ProductId): void {
  eventLog.value = `Selected ${productId}.`;
}

function recordArchive(payload: {
  productId: ProductId;
  reason: string;
}): void {
  eventLog.value = `Archived ${payload.productId}: ${payload.reason}`;
}

function recordSubmit(form: ProductForm): void {
  eventLog.value = `Submitted ${form.name}.`;
}
</script>

<template>
  <section class="chapter" aria-labelledby="chapter-05-title">
    <header class="chapter-header">
      <p class="eyebrow">Chapter 05</p>
      <h2 id="chapter-05-title">Vue + TypeScript Type Boundaries</h2>
      <p>
        Track what the type system checks, what the SFC compiler generates,
        what Vue receives at runtime, and which external values stay unknown.
      </p>
    </header>

    <div class="demo-grid">
      <TypedProps :product="products[0]" :badges="['readonly', 'typed']" />

      <TypedEmits
        :product="products[0]"
        @select="recordSelection"
        @archive="recordArchive"
        @submit="recordSubmit"
      />

      <PropsWithDefaults />

      <TypedVModel
        v-model="modelTitle"
        v-model:status="modelStatus"
      />

      <TypedSlots :products="products">
        <template #row="{ product, index }">
          <strong>{{ index + 1 }}. {{ product.name }}</strong>
        </template>
        <template #actions="{ productId }">
          <button type="button" @click="recordSelection(productId)">
            Select typed row
          </button>
        </template>
      </TypedSlots>

      <GenericSelect v-model="selectedOption" :items="selectOptions" />

      <InjectionProvider />
      <DefineExposeDemo />
      <TypedTemplateRefDemo />
      <TypeRuntimeBoundaryDemo />
      <VueTscBoundaryDemo />
    </div>

    <p class="event-log">{{ eventLog }}</p>

    <VueTsContractLab />
  </section>
</template>

<style scoped>
.chapter {
  display: grid;
  gap: 1rem;
}

.chapter-header {
  padding: 1.5rem;
  border: 1px solid #cbd8e2;
  border-radius: 1rem;
  background: #f1f6fa;
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

.eyebrow {
  margin: 0;
  color: #3d6d87;
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

.demo-grid button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #7897aa;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

.event-log {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #eaf1f5;
}

@media (max-width: 500px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
